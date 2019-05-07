# Help me WebUSB, you're my only hope

If I told you this talk is about USB, you would probably think of something mundane like a mouse, keyboard or printer. But these are not the droids we are looking for. What if I told you it is about USB on the web?

For me, USB devices running on the web include adventures with ActiveX, Internet Explorer 8 and Windows XP. USB devices whose drivers only run under very specific and relatively old conditions, but are still a requirement. We have one of three options: We settle for what we have been presented with, we splash out and replace all of the devices, or we find a new, more creative, cross-platform solution.

JavaScript: A new hope! In this talk I would like to tell you about the WebUSB API, what it is, how it works, and what it means for web developers. Using some devices I have had to deal with, I will show you how to connect to them directly from the browser. The WebUSB API gives us hope for the future of integrating hardware and the web.

## Intro

- USB devices are everywhere ✅
- USB is the de-facto standard for wired peripherals ✅
- Installing drivers for different devices can be difficult ✅
- Integrating with these devices can be even harder ✅
- You end up having to use old operating systems/browsers/software in order to support these devices ✅
- This can lead to issues ✅
    - security
    - skills to support old systems
- Fast food pay point example ✅
    - Computer with Windows
    - has a receipt printer
    - has a fingerprint scanner
    - has a credit card machine maybe?
    - Computer becomes outdated, company wants to replace it with Android tablet - software must be created from scratch

... WebUSB to the rescue ✅

## What is WebUSB

- API for accessing devices from the browser
- Safely expose USB device services to the web

## How USB Works

- Vendor/Product ID
- Configuration
- Interface
- Endpoint

## Demo

- demo.md - fan or fingerprint reader????

## Security concerns

- HTTPS
- User interaction
- User permission
- Feature policy
- No HID?

## Support

- Chrome
- Edge (as soon as it is based of Chromium)
- Firefox - undecided
- Safari - no :(