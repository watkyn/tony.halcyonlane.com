---
layout: post
title: 'Should I Trust the "Legion of the Bouncy Castle"'
date: 2009-04-02 14:47:34
author: Tony Eichelberger
categories: ['java']
---

I love the idea of Java Web Start and have even given it another try recently (The New Webstart), but as an occasional user of Web Start applications, I can see why it will never take off.  Java does not take off the engineering hats long enough to see how bad it really is.

Case Study:

SoapUI is a testing tool for web services that I have been using on a project.  I needed to run only the GUI portion of SoapUI from my mac so I decided to just web start it and go from there.

The web start button on the web site looks fabulous, great job.  I click on it and it asks me if I want to open the .jnlp file with Java Web Start.  Sure, let’s do that.  

First the ugly Java splash screen comes up.  (-1)

After downloading all the SoapUI jars a popup asks me if I trust eviware?  Sure, I click yes.  Then I am asked if I trust sun micorsystems.  Ok, i guess so, lets get on with this.  

But the kicker was the last one which asked me:

“Do you trust ‘The Legion of the Bouncy Castle’?”

HUH???

So, I googled the legion and found out what it was, and it sounds legit.  It is an open source encryption library of some kind.  And great, if they want to call themselves that, but please do not ask the users of your software if they trust the Legion of the Bouncy Castle!

Do not ask me if I trust this application more than once, and never, never, never, never, never, never, never ask a USER if they trust the Legion of the Bouncy Castle!

(-1000)

I close the app after I am done and realize I have no way of opening SoapUI again unless I navigate back to the web site and relaunch it.

Web Start should make it hard for developers to leave the user hanging as to how to launch the app a second time.

(-5)

So I give that cumulative score of -1051
