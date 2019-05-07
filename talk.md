Hello everybody, today we are going to be talking about USB and JavaScript. But before we start, let me introduce myself. My name is Gergana, but I usually go by Gery, because that's a bit easier to pronounce. I work for a company called BBD, we are a software consulting firm, but I work in the research and development team. A lot of people ask me what my team does, and the plain, boring answer is that we do some specialised consulting, training of the BBD developers and of course research. However, that's not all we do, we also have quite a bit of fun, doing things like building meme generators, using fruit for keyboards to play games and hacking astromech droids.

This last one is how I started out, and it is the thing that motivates me to never just settle for an app that a robot may come with, and to always keep looking for new and more innovative ways of hacking things, usually using JavaScript.

But as I mentioned earlier, today we are talking about USB. What are some things that come to mind when I say USB? Keyboard? Mouse? Printer? Flash Drive? USB has kind of become the de-facto standard for wired peripherals. USB devices are everywhere, and used for so many "things".

Most modern USB devices are plug and play, and usually they are quite easy to use. But every now and then you plug something into your computer, the dark side of the force responds with this... (device installing image) and the worst part is that more than half the time you were only ever going to use that thing that you plugged in that one time, never again. But now those drivers will be on your computer forever more.

Has anyone here ever tried to integrate one of their solutions with a USB device? Sometimes, depending on the device it is pretty simple, there is a common API you can connect to and use, or someone has already integrated with it before. The problems come when that API becomes outdated, and relies on Windows XP with Internet Explorer 8 and a whole bunch of VB6 code that some person wrote before you were even born, but it works so you are not allowed to touch it. 

This leads to problems, XP is an old operating system, IE 8 has security issues, the people who understand the code that was written 30 years ago are already retired. And all of us developers are like magpies, we are attracted to new and shiny technologies, we really don't want to be maintaining code that is older than we are.

Let me give you another example.

I grew up in the east rand, now I'm not really sure about the rest of Joburg, but in this part of town there is a very big culture of going out to get take aways on a Friday night. All kinds of things, from the popular ones like McDonalds, KFC and Debonairs, to the less known road houses that are owned by one of your neighbours. All of these places are packed with people on a Friday night. The cashiers at these places have to work really fast and rely on the machines they are using quite a lot.

A lot of the time these machines run relatively non complex software designed to be able to take an order, receive payment for that order and print a receipt. Seems, simple enough. There is a computer, for the purpose of this example, let us say that it is running Windows. In order for the cashier to identify themselves, let us say that there is a fingerprint reader, so that they don't have to log in with a password. Then we have some sort of receipt printer that will print your receipt. And we also have a credit card machine of some sort which can be integrated with the ordering system to make it faster to get everything sorted.

All of these bits need to be connected, one way for them to all be connected is via USB to the main computer running Windows. This means that we have some sort of Windows desktop application running and connecting to a number of different APIs in order to integrate with the different peripherals and allow the cashier to do their job quickly and efficiently. It works, there are no problems and the developer who created it is probably really happy with it.

But technology moves fast, and everyone, including the neighbourhood road house, needs to keep up. So when the owner of the fast food place decides that it is time to upgrade from Windows computers to Android tablets what happens? Well, the only option is to rewrite the entire system for Android...

Or is it...

JavaScript: A New Hope...

