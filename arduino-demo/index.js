const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');

const connect = document.getElementById('connect');

const onOffButton = document.getElementById('onOffButton');
const pinNumber = document.getElementById('pinNumber');

const waveButton = document.getElementById('waveButton');

let device;
connectButton.onclick = async () => {
  device = await navigator.usb.requestDevice({
    filters: [{ vendorId: 0x2341 }]
  });

  await device.open();

  await device.selectConfiguration(1);
  await device.claimInterface(2);
  await device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: 0x22,
    value: 0x01,
    index: 2
  });

  connected.style.display = 'block';
  connectButton.style.display = 'none';
  disconnectButton.style.display = 'initial';
};

let data = new Uint8Array(3);
onOffButton.onclick = async () => {
  if (!pinNumber.value) {
    alert('Fill in a pin number!');
    return;
  }
  data[0] = pinNumber.value;
  if (!data[1] || data[1] === 0) {
    data[1] = 255;
    onOffButton.value = 'Turn Off';
  } else {
    data[1] = 0;
    onOffButton.value = 'Turn On';
  }
  await device.transferOut(4, data);
};

waveButton.onclick = async () => {
  if (!data[2] || data[2] === 0) {
    data[2] = 1;
    waveButton.value = 'Stop';
  } else {
    data[2] = 0;
    waveButton.value = 'Wave';
  }
  await device.transferOut(4, data);
};

disconnectButton.onclick = async () => {
  await device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: 0x22,
    value: 0x00,
    index: 2
  });

  await device.close();

  connected.style.display = 'none';
  connectButton.style.display = 'initial';
  disconnectButton.style.display = 'none';
};
