<section>

A Practical Introduction to Testing
===================================

</section>
<section>

Unit testing
============

- What it is
- Why you might be interested in it
- How to go about doing it

<aside class="notes">

- It won't all make sense in the next 40 minutes
- I have a few resources at the end that you can use to continue looking into the topic
- A lot of these thoughts are not particularly original
- Testing was popularized in the 90's
- It exists today with bigger and better buzzwords
- That is to say, there are **a lot** of resources online and in print about testing
- They'll explain it better than I will
- I want to provide is an "advanced beginner's" thoughts on the subject

</aside>
</section>
<section>

<img src="https://i.imgur.com/bbxDcyA.gif" alt="Bugs Bunny and Daffy Duck arguing" class="stretch">

We might not agree
==================

<aside class="notes">

- You might disagree with me
- If at point you want to argue, pipe up and we can get a discussion on the go
- If you have questions, feel free to ask at any point

</aside>
</section>
<section>

What is testing?
================

It's like checking your math

<aside class="notes">

- You can think of it as checking your math
- Like you do with you math, some of you might not double-check it
- Testing is the process by which you can verify your applications
- We are capable of building complex systems
- We can lose the ability to keep it all in our head
- As you can imagine there are a number of ways you can go about this
    - Sitting down and running your application
    - Reading the logs
    - Clicking through the menus to see if everything still functions
- Automated testing is writing a program to test your other programs
- It kind of sounds like a lot of work
    - I need to write a program and then **another** program to test the program?
    - How do I test the 2nd program? (Spoiler: you don't.)
    - The 2nd program is so deadly simple that you can verify it manually quickly

</aside>
</section>
<section>

Software Complexity
===================

<aside class="notes">

- I find it hard to feel comfortable with software
- I am struggling to keep the whole picture in my head

How complex are we talking?
---------------------------

- Not very
- Actually, quite simple

(If there was a scale of simple to complex, where simple was a function that adds two numbers and complex was the control software for a space shuttle, I would say that at 5% into that scale I start to struggle with keeping the whole picture of the software in my head.)

- Challenges:
    - People
    - Teammates
    - Co-workers

Testing is a way for *my coworkers* to understand just what the heck they're looking at when I submit a PR with a five conditional loops and six flags.

</aside>
</section>
<section>

<img src="https://i.imgur.com/YrZfbnh.gif" alt="Ned bothering Homer" class="stretch">

</section>
<section>

Why do I need this?
===================

a.k.a the part where I push my own agenda

<aside class="notes">

- To be kind to your peers
- To be kind to future you

</aside>
</section>
<section>

Comfort
=======

<aside class="notes">

- Tests give me a way to modify an application and feel comfortable about not breaking things
- Tests give my coworkers a comfort that I can modify their code without breaking things

(And it gives you an out when you *do* break something in that you can say "well there should have been a test for that.")

</aside>
</section>
<section>

Two views
=========

1. Testing improves design and testable code is synonymous with well-designed code <sup>[[1]](http://programmers.stackexchange.com/q/288405/114526)</sup>
2. Testing provides developers comfort when making changes to software

<aside class="notes">

- I share the first view,
- I agree that testing is **a** path to better designed software
- I agree that thinking about testability forces you to think about
    - What each component of a system does
    - What components of a system rely on what other components of the system

</aside>
</section>
<section>

Tests can serve as
==================

- A way to further your design
- An indication of where issues exist
- Requirements
- Guards against regressions
- [...](http://martinfowler.com/articles/testing-culture.html)
- [...](http://stackoverflow.com/q/67299/1267663)
- [...](http://googletesting.blogspot.ca/2009/07/by-shyam-seshadri-nowadays-when-i-talk.html)

<aside class="notes">

- There are a lot of different benefits that tests can provide
- Everyone have a different something resonate with them
- For me, the most important thing that tests give me is comfort

</aside>
</section>
<section>

Trade-offs
==========

- "Bad" tests **are not** better than no tests
    - They provide false comfort
    - They misdirect efforts (e.g. when trying to fix bugs, general maintenance)
- Maintenance of bad tests can be a hindrance
- You will likely write a lot more test code than production code <sup>[[1]](http://programmers.stackexchange.com/q/156883/114526) [[2]](http://c2.com/cgi/wiki?ProductionCodeVsUnitTestsRatio)</sup>
- ...

<aside class="notes">

- $2x$ ratio
- [Cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) of 1
- At the end of the day it will always be (for the most part) up to you to decide whether or not it is worth it to test what you're building. (If you don't, your users will test it for you.)

</aside>
</section>
<section>

What + Why
==========

<aside class="notes">

Okay, that was what testing *is* and why you might want to do it....

</aside>
</section>
<section>

How?
====

<aside class="notes">

But how? How do we go *actually* go about it?

</aside>
</section>
<section>

    def add(x, y):
        """
        Returns the sum of the given numbers
        """
        return x + y

    def test_add():
        assertEqual(add(1, 2), 3)

<aside class="notes">

- "But that looks nothing like what I write everyday."

</aside>
</section>
<section>

1 weird trick
=============

<aside class="notes">

- Sorry for the slide title
- Decompose all the things

</aside>
</section>
<section>

Make everything look like this
------------------------------

    def add(x, y):
        """
        Returns the sum of the given numbers
        """
        return x + y

    def test_add():
        assertEqual(add(1, 2), 3)

<aside class="notes">

1. When was the last time you wrote something so simple
2. A better question: When was the last time you wrote something so *testable*?

</aside>
</section>
<section>

<img src="https://i.imgur.com/ubZODZy.gif" alt="Louis C.K. in despair" class="stretch">

</section>
<section>

"What do I want to test?"
=========================

</section>
<section>

Not everything
==============

<aside class="notes">

- You **DO NOT** want or need to test everything

</aside>
</section>
<section>

[Differential Diagnosis](https://en.wikipedia.org/wiki/Differential_diagnosis)
==============================================================================

- What does this test passing tell me?
- What does this test failing tell me?

</section>
<section>

Demos
=====

</section>
<section>

Buzzwords
=========

[TDD](https://en.wikipedia.org/wiki/Test-driven_development), [Acceptance and Functional Testing](http://stackoverflow.com/a/3371165/1267663), [Mocks, Stubs, Fakes, Test Doubles](http://googletesting.blogspot.ca/2013/07/testing-on-toilet-know-your-test-doubles.html), [Integration Testing](http://programmers.stackexchange.com/q/48237/114526), [Spies](https://robots.thoughtbot.com/spy-vs-spy), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development), [Dependency Injection](http://stackoverflow.com/a/140655/1267663)

<aside class="notes">

- I have managed to get this far without using the common testing buzzwords
- Backfill the presentation with buzzwords to meet the quota
- The demos covered a lot more than you might think
    - We set up a unit testing framework to run our tests
    - Wrote a test
    - Dependency injection
        - The backbone of testing
    - Test-drove a change

</aside>
</section>
<section>

Test the next application you write
===================================

[tape](https://github.com/substack/tape) (JavaScript), [xUnit](https://xunit.github.io/) (.NET), [JUnit](http://junit.org/) (Java), [unittest](https://docs.python.org/3.5/library/unittest.html) (Python 2&3), [...](https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks)

<aside class="notes">

- We have covered the basics of what testing is and why it's important
- How it can manifest itself in your day-to-day applications
- Call to action is this:
    1. Add a testing framework into your current project (they are all the same)
    2. test the next function you write

</aside>
</section>
<section>

Resources
=========

- Articles
    - [Google Testing Blog](http://googletesting.blogspot.ca/)
- Audio
    - [Software Engineering Radio Podcast](http://www.se-radio.net/tag/testing/)
    - [Is TDD Dead?](http://martinfowler.com/articles/is-tdd-dead/)
- Books
    - [Extreme Programming Explained](http://www.amazon.ca/dp/0321278658)
    - [The Pragmatic Programmer](https://pragprog.com/book/tpp/the-pragmatic-programmer)
- Videos
    - [Test Driven Development with Kent Beck](https://pragprog.com/screencasts/v-kbtdd/test-driven-development)
    - [The Clean Code Talks – Unit Testing](https://www.youtube.com/watch?v=wEhu57pih5w)

</section>
<section>

EOF
===

</section>
<section>

Questions?
==========

</section>
