---
layout: post
title: "Updating Rubygems on an Old 10.5 Leopard Machine"
date: 2012-01-06 15:04:18
author: Tony Eichelberger
categories: ['osx', 'ruby']
---

I ran into this problem today when trying to update my ruby gems on a fresh OSX 10.5 machine for testing:

Updating RubyGems…
ERROR:  While executing gem … (Gem::RemoteSourceException)
    HTTP Response 302 fetching http://gems.rubyforge.org/yaml

After a little googling I saw where gems were stored on S3 so I just added the —source option and that worked.  Here is the command for posterity.

gem update —system —source http://production.s3.rubygems.org/