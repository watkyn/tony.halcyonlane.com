---
layout: post
title: "Pattern of the Week - Builder"
date: 2009-05-22 16:17:24
author: Tony Eichelberger
categories: ['patterns']
---

The intent of the BUILDER pattern is to move the construction logic for an object outside the class to be instantiated.
A builder class offloads construction logic from a domain class and can accept initialization parameters gradually, as a parser discovers them.
(Java Design Patterns)

A common motivation for refactoring to a Builder is to simplify the client code that creates complex objects.
(Refactoring to Patterns)

One place that I frequently will use the builder pattern in the future is creating objects for my unit tests in Java.  Test Data Builder works really well for this since it allows for having immutable objects without having to specify all the parameters in the constructor of the class.  It also allows for introducing test doubles easily for only specific cases, etc.

For Test Data Builders in Java see Jay Fields article.

For a Ruby test data builder, check out Factory Girl

Immutability simplifies concurrency issues, but complicates construction by forcing all state to be passed into the constructor.  When we were using Google Protocol Buffers, I noticed their diligence in making sure the only mutable objects were Builder objects.  This gives us the flexibility of building up the data in the builder class however it seems to work best, but then once the REAL object is built, it is immutable.

Whenever there is pain putting together a complex object graph, test objects, composite objects, and the like, the Builder pattern is very useful.