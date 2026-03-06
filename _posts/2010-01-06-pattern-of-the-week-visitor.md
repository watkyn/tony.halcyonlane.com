---
layout: post
title: "Pattern of the Week - Visitor"
date: 2010-01-06 17:05:07
author: Tony Eichelberger
categories: ['patterns']
---

The intent of VISITOR is to let you define a new operation for a hierarchy without changing the hierarchy classes. (Java Design Patterns)

Josh Kerievsky puts it this way, “The job of many real world Visitors is to accumulate information.”

So what exactly does that mean in practice?  The classes in the hierarchy must have a method called accept() that takes in an specified interface.  Then the interface will have visit() methods on there.  The visit signature will be determined by which class in the hierarchy you want to visit, and thus extend functionality to.

The tricky part for me to understand was the “double-dispatch” that needs to take place for Visitor to function.  An object that conforms to the interface needed by the visitor takes the visitor in the accept() method.  Inside the accept() method the visit method is called by the object which then passes itself to the correct visit() method of the Visitor.

Confusing?  Yes, it seems to be rather.

I like the quote by Ralph Johnson about Visitor, “Most of the time you don’t need Visitor, but when you do need Visitor, you really need Visitor!”

That tells me, to not go out of my way to find uses for Visitor, but to stay far away from it until the light bulb comes on in a particular project where this makes perfect sense.  It may never happen, in which case I won’t lose any sleep.

Visitor does not apply to ruby or any dynamic language where you can change the class hierarchy whenever you wish, on the fly.  Even so, I am going to show this code in ruby, pretending to be Java.  The interesting thing here is that ruby does not have method overloading since it is dynamically types.  So the actual java example would look different, in that the visit methods would be overloaded with the different types that we know of.  The ruby example has to check inside the visit method for the appropriate type and handle it accordingly.  Method overloading is a nice thing to have when you want it.

My TreeVisitor example in ruby.