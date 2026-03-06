---
layout: post
title: "IBOutlets and Interface Builder"
date: 2009-04-06 09:56:00
author: Tony Eichelberger
categories: ['iphone']
---

It has taken me about 5 sessions of working through the Pragmatic Programmers iPhone screencasts before I am starting to feel comfortable “wiring up” components through Interface Builder.

It really is a “visual” dependency injection framework.  I specify the class that I want access to in my header file and optionally have properties set for it.  Then, when I drag the visual representation of the class to another visual representation of another class, it tells the compiler to inject this class into that class.  

Connecting, via the right click drag and drop, is essentially setting up a configuration that will inject that component into your class at runtime.  Before today, I didn’t really notice the list of IBOutlets each component was expecting to have set and the list that each component was referenced by.  For some reason, that was the point at which everything started to click.

Before today, I just saw Bill D. dragging stuff around and “wiring things together”.  Then I would try to start from scratch without following him step by step and get totally lost as soon as I had to figure out which components to hook up to which controllers, etc.

I don’t know why it has helped me to think of it in terms of dependency injection, but if it helps, it helps.  Probably more than anything, it just takes repetition until something clicks.  One or two more episodes and possibly a small project start to finish, and I think it will be cemented in the brain paths for a good long time.