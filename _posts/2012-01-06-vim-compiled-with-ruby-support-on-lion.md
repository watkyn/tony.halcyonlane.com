---
layout: post
title: "Vim Compiled With Ruby Support on Lion"
date: 2012-01-06 15:03:30
author: Tony Eichelberger
categories: ['osx', 'ruby', 'vim']
---

If you are a vim user on a Mac and you also like the Command-t plugin you have no doubt had to deal with the default vim, which does not come with ruby support out of the box. I have resorted to using MacVim for most of my needs but once in a while I wish Command-t was there for me in a vim terminal (read tmux).
 
Well, I just found out that MacVim ships with a Vim and MacVim executable, so just use that.
 
I added this alias to my bash profile and all was good:

alias vim='/Applications/MacVim.app/Contents/MacOS/Vim'

That will take precedence over /usr/bin/vim (except if you do sudo vim, then you are back to the old /usr/bin/vim).
 
Good enough, is what I say.
 

PS. I made a symlink from /Applications/MacVim.app/Contents/MacOS/Vim into /usr/bin/vim and it didn't work quite right. I got a bunch of warnings about color scheme, etc. Not sure why, but I didn’t feel the need to dig deeper. That is why I went the alias route.