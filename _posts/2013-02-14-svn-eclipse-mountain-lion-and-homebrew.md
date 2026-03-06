---
layout: post
title: "SVN Eclipse Mountain Lion and Homebrew"
date: 2013-02-14 08:28:37
author: Tony Eichelberger
categories: ['eclipse', 'osx', 'svn']
---

I was frustrated trying to figure out how to get subversion installed on my OSX machine so that it would be compatible with Eclipse. I wanted to go with the JavaHL svn adapter but I had already installed svn using homebrew.
I tried to reinstall svn with homebrew like this but got an error:

```
$ brew install --universal --java subversion
   Error: subversion dependency neon not installed with:
     --universal

```There are several dependencies that need to be uninstalled before installing subversion again with –univeral and –java options 
For me it was this:

```

$ brew rm neon
$ brew rm sqlite
$ brew rm serf

```

Then this worked:
```
$ brew install --universal --java subversion
```