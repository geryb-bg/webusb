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

const button = document.querySelector('#scanButton');
const canvas = document.getElementById('fingerImage');
const ctx = canvas.getContext('2d');

button.onclick = async () => {
  const device = await navigator.usb.requestDevice({ filters: [] });
  console.log(device);

  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);

  //EPIN = 5 EPOUT = 6

  //TURN ON
  await device.transferOut(6, new Uint8Array(getCommand));
  await device.transferIn(5, 512);

  await setDeviceConfig(device, false);

  //SCAN
  await device.transferOut(6, new Uint8Array(mp2));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(armTrigger));
  let armTriggerResult = await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(mp2));
  await device.transferIn(5, 1024);

  let taken = false;
  while (true) {
    if (
      (armTriggerResult.data.getUint8(8) & 0xff) == 4 &&
      (armTriggerResult.data.getUint8(12) & 0xff) == 1 &&
      taken == false
    ) {
      taken = true;
    }

    if (taken) {
      console.log('image taken');
      if (
        (armTriggerResult.data.getUint8(8) & 0xff) == 4 &&
        (armTriggerResult.data.getUint8(12) & 0xff) == 0
      ) {
        await device.transferOut(6, new Uint8Array(getImage));
        let data = await device.transferIn(5, 1024);

        let readSize = 512;
        let count = 0;
        let imageArray = [];
        while (true) {
          data = await device.transferIn(5, readSize);
          count++;
          console.log(count);
          let currArray = new Uint8Array(data.data.buffer);
          imageArray = [...imageArray, ...currArray];
          if (count === 192) {
            break;
          }
        }

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

        //clean up
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
        break;
      }
    } else {
      console.log('waiting for finger');
    }

    await device.transferOut(6, new Uint8Array(getBusy));
    armTriggerResult = await device.transferIn(5, 1024);
    armTriggerResult = await device.transferIn(5, 1024);
    await device.transferOut(6, new Uint8Array(mp2));

    if (armTriggerResult.data.getUint8(12) == 11) {
      console.log('error');
      break;
    }
  }
};

async function setDeviceConfig(device) {
  await device.transferOut(6, new Uint8Array(mp1));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(setConfig));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(mp3));
  await device.transferIn(5, 1024);
  await device.transferOut(6, new Uint8Array(getConfig));
  await device.transferIn(5, 1024);
}
