# meeple.space

[Meeple.space](http://meeple.space) is a Meetup-like site for planning and joining board-gaming events. It has a Rails back-end API and uses Backbone on the front-end.  It connects to an external XML API from BoardGameGeek.com to populate its database of games and uses the Google Maps API and Geocoder for hosts to select locations.

# How to use:
* [Use the live site](http://meeple.space) OR
* Clone or Extract ZIP for this repo
* Run rake db:create
* Push to heroku or the host of your choice

# Major Challenges:
* Cannot make AJAX requests for external XML data because of the same-origin rule - this must be done on the backend with Ruby.
* Parsing XML data with XPATH & CSS queries
* Create a RESTful JSON API that does not leak protected user data.
* Restrict Google location queries just to the city the user has selected. 

# Tech used in project:
* Ruby
* JavaScript
* Rails 4
* Backbone.js
* Underscore
* jQuery
* PostgreSQL
* pg_search gem
* BCrypt
* rest-client gem (for requests to external XML API)
* Nokogiri (for parsing XML)
* jbuilder
* New Relic
* Heroku
* AWS S3
* Figaro
* Paperclip
* Combodate
* Moment