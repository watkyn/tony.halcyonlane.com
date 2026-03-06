---
layout: post
title: "OCUnit Configuration for iPhone Development"
date: 2009-09-14 08:04:55
author: Tony Eichelberger
categories: ['iphone', 'objective-c']
---

On an iPhone project I am currently working on, I have been experimenting with some unit testing frameworks.  Actually, I tried the rbiphonetesting ruby framework from Dr. Nic and that got me started down the TDD path on this project.

It was actually pretty sweet, since I couldn’t test any UIKit classes from the ruby framework since it was using MacRuby which does not run on the iPhone sdk.  This was a nice constraint, as I was forced to put any code I wanted to test into a non UI class.  This helped me clean out the UI and delegate to models, presenters, etc.

Then I hit an issue with differences in string handling between MacRuby and the iPhone sdk.  My unit tests were no longer reliable, since they were passing but when running on the iPhone, I could obviously see incorrect behavior.

I knew going in, that this could be a problem.  It was a fun experiment, and actually gave me a good perspective on testing apps on the iPhone. 

I have recently ported all my ruby tests over to OCUnit and am back up and running.  If I had started with OCUnit, I think my tests may be quite different, as well as the structure of my object model.

One thing that stuck out for me after porting all the tests over to OCUnit, is that they are incredibly fast compared to the ruby version.  Which is good, since they run every time I build my code in Xcode.