---
layout: post
title: "Pattern of the Week - Flyweight"
date: 2009-05-22 16:17:12
author: Tony Eichelberger
categories: ['patterns']
---

The intent of the FLYWEIGHT pattern is to use sharing to support large numbers of fine-grained objects efficiently.  (Java Design Patterns)

I have always wondered what exactly the Flyweight pattern was all about so this week I decided I would learn.  Right away in the definition is the use of another term that I usually find confusing, “fine-grained vs coarse-grained” objects.

It turns out fine-grained and coarse-grained are terms used in physics and have also come to be used in other technical fields.  For objects, to be fine-grained generally means to be small with a focused responsibility whereas coarse-grained objects generally encapsulate the functionality of many fine-grained objects.

J2EE uses these terms a lot because of the problems involved in having fine-grained objects being too “chatty” in a distributed system.

Anyway, to get back to Flyweight, lets say there is a fine-grained object like a Unit.  Unit is a measurement that can be anything from inches to liters to moles.  The point being, a Unit is immutable and one instance can be shared safely across the entire system.  An inch is always going to be an inch, so lets share the inch Unit instead of having everyone create there own instance of inch anytime they need it.

One approach (used in the book) is to create a factory like UnitFactory that will return the shared instance of each Unit.  Enforcing the use of UnitFactory was done by hiding all the Unit implementations in an inner class of the Factory so that they can not be instantiated directly.  The Unit interface is exposed to all.  Asking the UnitFactory for a Unit could either be done by passing in a string or an enum representing the Unit to be returned.

So, if you really want to prematurelly optimize your next project, analyze all the objects that could potentially be shared and tell everyone on your team that the Flyweight pattern would be a really good idea.