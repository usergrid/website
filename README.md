Apache Usergrid Website
=======================

All pages are generated from the content (html,js,css) under `content/`
All doc sources in markdown files under `content/docs/`

To generate the site locally, you need [pandoc](http://johnmacfarlane.net/pandoc/installing.html), ruby and python installed.

You will need pygments

    $ sudo easy_install Pygments

You will also need a few rubygems

    $ sudo gem install nanoc pygments.rb htmlentities pandoc-ruby nokogiri rack mime-types

To test locally, you can use the autocompiler (will build changes on every request) and check the website at http://0.0.0.0:3000/

	$ nanoc autocompile

To build for export use the following comments. The static website will be in `publish/`

	$ nanoc compile
