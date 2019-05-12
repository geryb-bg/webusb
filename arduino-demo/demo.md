# Connect/Disconnect

1. `html1`
2. `getElement`
        - `connectButton`
        - `disconnectButton`
3. `let device;`
4. `buttonClick` - `connect`
5. `connect`
6. `buttonClick` - `disconnect`
7. `disconnect`

# LED

1. `html2`
2. `getElement`
        - `connected`
        - `onOffButton`
        - `pinNumber`
3. `displayConnected`
        - in connect `block`
        - in disconnect `none`
4. `let data = new Uint8Array(3);`
5. `buttonClick` - `onOff`
6. `sendData`

# Servo

1. `html3`
2. `getElement` - `waveButton`
3. `buttonClick` - `wave`
4. `sendWave`