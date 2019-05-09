Hello everybody, today we are going to be talking about USB and JavaScript. But before we start, let me introduce myself. My name is Gergana, but I usually go by Gery, because that's a bit easier to pronounce. I work for a company called BBD, we are a software consulting firm, but I work in the research and development team. A lot of people ask me what my team does, and the plain, boring answer is that we do some specialised consulting, training of the BBD developers and of course research. However, that's not all we do, we also have quite a bit of fun, doing things like building meme generators, using fruit for keyboards to play games and hacking astromech droids.

This last one is how I started out, and it is the thing that motivates me to never just settle for an app that a robot may come with, and to always keep looking for new and more innovative ways of hacking things, usually using JavaScript.

But as I mentioned earlier, today we are talking about USB. What are some things that come to mind when I say USB? Keyboard? Mouse? Printer? Flash Drive? USB has kind of become the de-facto standard for wired peripherals. USB devices are everywhere, and used for so many "things".

Most modern USB devices are plug and play, and usually they are quite easy to use. But every now and then you plug something into your computer, the dark side of the force responds with this... (device installing image) and the worst part is that more than half the time you were only ever going to use that thing that you plugged in that one time, never again. But now those drivers will be on your computer forever more.

Has anyone here ever tried to integrate one of their solutions with a USB device? Sometimes, depending on the device it is pretty simple, there is a common API you can connect to and use, or someone has already integrated with it before. The problems come when that API becomes outdated, and relies on Windows XP with Internet Explorer 8 and a whole bunch of VB6 code that some person wrote before you were even born, but it works so you are not allowed to touch it. 

This leads to problems, XP is an old operating system, it is no longer actively maintained, IE 8 has security issues that are probably not going to be fixed because it is outdated, and the people who understand the code that was written 30 years ago are already retired. 

Last, and probably not least, all of us developers are like magpies, we are attracted to new and shiny technologies, we really don't want to be maintaining code that is older than we are.

Let me give you another example.

I grew up in the east rand, now I'm not really sure about the rest of Joburg, but in this part of town there is a very big culture of going out to get take aways on a Friday night. All kinds of things, from the popular ones like McDonalds, KFC and Burger King, to the less known road houses that are owned by one of your neighbours. All of these places are packed with people on a Friday night. The cashiers at these places have to work really fast and rely on the machines they are using quite a lot.

A lot of the time these machines run relatively non complex software designed to be able to take an order, receive payment for that order and print a receipt. Seems, simple enough.

There is a computer, usually a touch screen, for the purpose of this example, let us say that it is running Windows. In order for the cashier to identify themselves, let us say that there is a fingerprint reader, so that they don't have to log in with a password. Then we have some sort of receipt printer that will print your receipt. And we also have a credit card machine of some sort which can be integrated with the ordering system to make it faster to get everything sorted.

All of these bits need to be connected, one way for them to all be connected is via USB to the main computer running Windows. This means that we have some sort of Windows desktop application running and connecting to a number of different APIs in order to integrate with the different peripherals and allow the cashier to do their job quickly and efficiently. It works, there are no problems and the developer who created it is probably really happy with it.

But technology moves fast, and everyone, including the neighbourhood road house, needs to keep up. So when the owner of the fast food place decides that it is time to upgrade from Windows computers to Android tablets what happens? Well, the only option is to rewrite the entire system for Android...

Or is it...

JavaScript: A New Hope...

The WebUSB API is a proposed web platform standard that provides a way to expose USB devices on the web. Using the web, we can build cross platform JavaScript applications for connecting to USB devices.

The API is based on USB standards, therefore some hardware knowledge is required in order to understand how to use it. There are a number of good references that explain how USB works, however if you come from a web development background like me and you've never really done much hardware, it can be a little complicated. So, let me give you the short version of what I understand, and what I needed in order to hack a USB device.

This is pretty much all of the code you need, now there are a few things we need to concentrate on in this code. Firstly, the filter, here we are filtering by the vendor ID, you can filter by a number of different things, the most common are the vendor and product IDs. These IDs are assigned by the USB standards standards committee as well as the manufacturers of the device. They are hexadecimal numbers and you can find them differently on different platforms. (show how to do it one mac)

These filters are provided to limit the list when we scan for devices that are plugged into our computer.

The next important part is the configuration. It contains values that define things like whether the device is self powered or needs to be plugged in, how much power it needs and what interfaces it has. Even though most USB devices would only ever have one configuration, if the device happens to have more than one there will still be only one that is enabled at one time. An example of a device with multiple configurations is a cellphone. Your cellphone usually knows whether it is plugged in directly to the mains or to your computer. This is because a different configuration is selected based on where the device is plugged in.

Then we have the interfaces, which are groupings of functions of the device. We can only interact with one interface at a time, in other words we will only interact with one feature of the device at any point in time. By claiming the interface we are taking control of that specific feature. We are now able to communicate with the input and output endpoints of the device and use that feature.

If you have a data sheet for your device, then finding the numbers for the configuration and interface is quite easy. If you do not have the data sheet, then you have to do some guess work. You start with 0 and run your program, if you get an error about the configuration or interface being out of range, then you move onto 1 and so on until there are no more errors.

Next we have controlTransferOut and transferIn. These are two of the methods we use to communicate with the device's endpoints. There are a number of different input and output endpoints per interface and each can send and receive different data. If the SDK for the device you are hacking is open source then you can take a look in there for what kinds of data can go between your computer and the device. If it is not open source, and you really want to hack it, then you can use something like WireShark to trace the packets and see what the data is. The only downside here is that in order to use wireshark you have to use windows or linux, mac does not allow it.

There are 4 types of transfers that can happen between your computer and the device.

The first is a control transfer, this is used for device configuration, it is the setup method in order for your device and computer to be able to communicate. This transfer always happens with a default endpoint, usually 0, which every interface has.

Interrupt transfers are used for low latency data, things like mouse clicks and button presses use this kind of transfer to send data from device to host.

Bulk transfers allow for delays, they are used for sending big amounts of data. A USB flash disk would use this kind of transfer.

And lastly Isochronous transfers are used for things like streaming audio or video, these transfers can not guarantee that the data will be delivered, but can reserve bandwidth in order to guarantee the time in which the data will be delivered. This is why they can be used for streaming.

The interrupt, bulk and Isochronous transfers all have to specify what endpoint they are communicating with. This is another thing that wireshark can help with.

