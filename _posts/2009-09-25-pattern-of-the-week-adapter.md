---
layout: post
title: "Pattern of the Week - Adapter"
date: 2009-09-25 16:33:09
author: Tony Eichelberger
categories: ['patterns']
---

From Java Design Patterns:
The intent of ADAPTER is to provide the interface that a client expects while using the services of a class with a different interface.

This actually makes sense to me right out of the gate.  I’ve probably read about and used Adapter before but needed a refresher on what it actually was.

So lets say that I have a lab processing class that takes LabOrder objects and processes them somehow.  Another team in my company has a service that supplies LabResults from a different vendor than the one I work with but they like the processing class I made and want me to process their LabResult class also.

I see that the objects do similar things but have slightly different methods, so I create an adapter class that implements the LabOrder interface and delegates to the LabResult object that is passed in to the constructor.  No code changes required for the lab processing class.

githup Adapter code