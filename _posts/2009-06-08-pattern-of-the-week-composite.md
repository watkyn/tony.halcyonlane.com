---
layout: post
title: "Pattern of the Week - Composite"
date: 2009-06-08 08:12:54
author: Tony Eichelberger
categories: ['patterns']
---

The intent of the COMPOSITE pattern is to let clients treat individual objects and compositions of objects uniformly. (Java Design Patterns)

There are objects that have children and there are objects that don’t.  The objects that have children can have a common interface with the objects that do not have children, and so Composite.

The example I used in my code (see below) was that of a Menu and MenuItems.  Swing uses this model for its menus.  A Menu may or may not have sub menus.  A MenuItem, however, never has sub menus; it is always the end of the road, a leaf.

A process may want to traverse a tree of objects but it does not want to have to figure out who has child elements and who does.  Composite attempts to solve this problem by establishing a common interface between the two types.  Then the object that has children can traverse its children when the common method is called and call the common method on the child objects.

Here is a link to the ruby code I wrote up to help me understand Composite better.

I ran into another good example over the weekend.  We went to a tree identification outing and the naturalist there had a identification key.  It used decision tree logic, and I thought to myself, “Hey, the Composite pattern in real life!”.  What a geek I am sometimes.

Each question led to either one or many follow up questions.  I thought of putting the logic into an iPhone application, and realized I could model the questions as Composites.  Some questions would be trees, and others would be leaves.  Perfect for a tree identification app!