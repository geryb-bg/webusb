import {
  getCommand,
  mp1,
  mp2,
  mp3,
  setConfig,
  getConfig,
  armTrigger,
  getBusy,
  getImage,
  putFinished,
  getTemplate
} from './commands.js';

const connectButton = document.getElementById('connectButton');
const scanButton = document.getElementById('scanButton');
const message = document.getElementById('message');
const canvas = document.getElementById('fingerImage');
const ctx = canvas.getContext('2d');

let device;
connectButton.onclick = async () => {
  device = await navigator.usb.requestDevice({ filters: [] });

  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);

  //TURN ON
  await device.transferOut(6, new Uint8Array(getCommand));
  await device.transferIn(5, 512);
  await setDeviceConfig();

  scanButton.style.display = 'initial';
  message.innerText = 'Connected to scanner. Press scan to continue.';
};

scanButton.onclick = async () => {
  let scanResult = await turnScannerOn();
  message.innerText = 'Place your finger on the scanner.';

  let taken = false;
  while (true) {
    if (
      (scanResult.data.getUint8(8) & 0xff) == 4 &&
      (scanResult.data.getUint8(12) & 0xff) == 1 &&
      taken == false
    ) {
      taken = true;
    }

    if (taken) {
      message.innerText = 'Image is being generated.';
      console.log('image taken');
      if (
        (scanResult.data.getUint8(8) & 0xff) == 4 &&
        (scanResult.data.getUint8(12) & 0xff) == 0
      ) {
        console.log('image transfered');
        await createImage();
        break;
      }
    } else {
      console.log('waiting for finger');
    }

    await device.transferOut(6, new Uint8Array(getBusy));
    scanResult = await device.transferIn(5, 1024);
    scanResult = await device.transferIn(5, 1024);
    await device.transferOut(6, new Uint8Array(mp2));

    if (scanResult.data.getUint8(12) == 11) {
      console.log('Scan error');
      break;
    }
  }

  message.innerText = '';
};

async function setDeviceConfig() {
  await device.transferOut(6, new Uint8Array(mp1));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(setConfig));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(mp3));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(getConfig));
  await device.transferIn(5, 1024);
}

async function turnScannerOn() {
  await device.transferOut(6, new Uint8Array(mp2));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(armTrigger));
  let result = await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(mp2));
  await device.transferIn(5, 1024);

  return result;
}

async function createImage() {
  const imageArray = await getImageData();
  drawImage(imageArray);
  await cleanUp();
}

async function getImageData() {
  await device.transferOut(6, new Uint8Array(getImage));
  let data = await device.transferIn(5, 1024);

  let readSize = 512;
  let count = 0;
  let imageArray = [];
  while (true) {
    data = await device.transferIn(5, readSize);
    count++;
    let currArray = new Uint8Array(data.data.buffer);
    imageArray = [...imageArray, ...currArray];
    if (count === 192) {
      break;
    }
  }

  return imageArray;
}

function drawImage(imageArray) {
  canvas.style.display = 'block';
  let imagePix = 0;
  for (let y = 0; y < 352; y++) {
    for (let x = 0; x < 280; x++) {
      let n = imageArray[imagePix] & 0xff;

      ctx.fillStyle = `rgb(${n}, ${n}, ${n})`;
      ctx.fillRect(x, y, 1, 1);

      imagePix += 1;

      if (imagePix >= imageArray.length) break;
    }
    if (imagePix >= imageArray.length) break;
  }
}

async function cleanUp() {
  await device.transferOut(6, new Uint8Array(mp2));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(putFinished));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(mp2));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(getTemplate));
  await device.transferIn(5, 1024);
  //flush memory
  await device.transferIn(5, 512);
  await device.transferIn(5, 512);
}
