---
layout: post
title: "Pattern of the Week - Decorator"
date: 2009-04-03 14:13:07
author: Tony Eichelberger
categories: ['patterns']
---

The intent of DECORATOR is to let you compose new variations of an operation at runtime. (Java Design Patterns)

The example given in the book identifies java streams as using the Decorator pattern.  Right away my reaction is, I have always hated dealing with streams in Java, they are always so confusing.

I like Russ Olsen’s comment in Design Patterns in Ruby:
“The classic Decorator pattern is loved more by the folks who build the thing than by those who use it.”

I would agree.

But understanding Decorator will help me recognize when someone has chosen to use Decorator in an API, and maybe it won’t be confusing anymore.

When to use Decorator is not something I am going to try and explain.  I am only interested in trying to explain what Decorator is, so as to help solidify it in my brain forever.  I am going to give a short explanation and then a link to the code I have been experimenting with.

Once the class to be decorated (my example uses a Person class) has been determined, a suitable interface must be agreed upon, that all decorators must implement.  The Decorator must take the Person class as a constructor parameter and delegate to that instance for all methods that it does not explicitly want to manage.  In Most cases, the methods in the Decorator will always delegate to the person instance passed in but some methods will add additional logic.

This pattern allows chaining of Decorators and can be very flexible.  Check out my ruby example code where in I experiment with Decorator following the Java idiom with its limitations and then using ruby modules.  Notice how the two types of Decorators keep chaining together.

Git Hub Decorator.rb

Template Method and Strategy are competing patterns with Decorator.