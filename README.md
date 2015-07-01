Requirements
------------

We're building sigmapoint.pl using jekyll so you will at least need ruby
to build/run it.

If you're on Windows get ruby and ruby DevKit - be sure you use proper versions.
Probably you need to add environmental variable for 'ruby' command manually or
you have to use absolute path to run it.

After you install both ruby and ruby DevKit, add a path to your ruby to config.yml file
(located where you have installed ruby) like this (dash is necessary):

    - C:/path/to/ruby

Then in location where you extracted ruby DevKit run:

    $ ruby dk.rb init
    $ ruby dk.rb install

Now you can go to 'Getting Bundler' section.


If on OSX or Linux get yourself rvm by following these instructions
https://rvm.io/ (on osx you need Homebrew before you install rvm).

Then you probably want to install some non-system ruby:

    $ rvm list known # this will list available rubies
    $ rvm install <2.X.X> # ruby 2.2.0 works for me but feel free to pick one

You want to create a separate gemset so gems we use for our site don't
clash with your global gems. Create it with

    $ rvm gemset create sigmapoint.github.io

Last, you want to activate the gemset with the ruby you have installed.

    $ rvm use <2.X.X>@sigmapoint.github.io # use 2.2.0 or any version you have

You want to do this step every time you work on this project.


Getting Bundler
===============

Github pages depend on `bundler` gem for builds so make sure you install
it to your gemset *after you activate it*. It's not in the Gemfile (deps list):

    $ gem install bundler


Getting the source and building
-------------------------------

Check out the sources and cd into the project:

    $ git clone https://github.com/Sigmapoint/sigmapoint.github.io
    $ cd sigmapoint.github.io

Install dependencies:

    $ bundle install

Run the development server:

    $ bundle exec jekyll serve

The development server will watch for source changes and rebuild on every
file save. So a CTRL+R will suffice to see changes in browser.


Deploying
---------

To push your changes to production just do:

    $ git push origin master:master
