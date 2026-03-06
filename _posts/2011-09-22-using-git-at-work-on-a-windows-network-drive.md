---
layout: post
title: "Using Git at Work on a Windows Network Drive"
date: 2011-09-22 15:41:10
author: Tony Eichelberger
categories: ['git']
---

Rarely do I program without using some sort of version control.  I’ve been using git locally on my Windows machine at work to manage some scripts and I use a network drive as my remote in case my machine dies.  Here are the steps I used to get that up and running.

You will need to install git (try msysgit windows installer) and learn about git (try git immersion) before setting up your remote repository.

Create a folder that will hold your git repository on your network share.
I have a mapped drive on g: and my repository is g:\scripts so that is what my examples will use.

From a cmd prompt change to your mapped drive.
> cd g:

Then cd into your soon to be git repository.
> cd scripts

Then create an empty git repository.  If you do not use the —bare option, you will have issues so don’t leave that out.
> git init —bare

Now if you don’t have a local git repository yet, then you can clone your new repository wherever you like by navigating back to your local drive.
> c:
> cd work/scripts
> git clone file://g:\scripts 
(UNC paths also work  file://\server\share\username\scripts)

When you clone, you automatically get a remote called “origin” and you can push to the server for safe keeping any time you make changes locally.
> git push origin master

If you already have a git repository and you just want to push out to the shared drive then you can do this from within your local git manged project.
> git remote add origin file://g:\scripts
> git push origin master