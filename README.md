# meeple.space

[Heroku link][heroku]

[heroku]: https://meeplespace.herokuapp.com

## Minimum Viable Product
Meeple.space is a clone of Meetup for playing board games built on Rails and Backbone. 

Non-Users can:

- [ ] View Cities
- [ ] View Hosts
- [ ] View Upcoming Events
- [ ] Create accounts

Users can also:

- [ ] Create sessions (log in)
- [ ] Sign up for Upcoming Event Slots
- [ ] Sign up for Upcoming Event Waitlists
- [ ] Sign up to Host Events
- [ ] View their Event Calendar
- [ ] Create a Public Profile

Hosts can also:

- [ ] Create an Event
- [ ] Give Event a Date and Location
- [ ] Set an Event's Game_ID(BGG XML API)
- [ ] Make an event location public or private to non-attendees
- [ ] Send Event Reminders


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]
* [Stock images attribution][attrib]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
[attrib]: ./docs/attrib.md

## Implementation Timeline

### Phase 1: User Authentication, Profiles (~1 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By the end of this phase, users will be able to create an account, sign in and update their account information using Rails views. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Creating Events (~2 days)
I will allow users to make themselves a host and
create events through API routes and Backbone views. By the end of this phase, users will be able to create and view events.  Games will be given just a string (address) location for now until Google API lookups are implemented in a later phase.

[Details][phase-two]

### Phase 3: Editing Events and Profiles (~1 day)
I will integrate Paperclip to allow users to upload images for their profiles or events.  I will improve the forms here and make sure that all of the features until now work solidly.

[Details][phase-three]

### Phase 4: External API Integration (~2-3 days)
In this phase I will implement Google Maps/Places API integration to allow users to set validated locations and display a small map.  I will also allow users to lookup games in the BoardGameGeek XML API and overwrite the title and img fields for games.

[Details][phase-four]

### Phase 5: Notifications, Email Reminders and CSS (~2 day)
Add Notifications to application. I'll also add the ability for the app to automatically send users reminder emails for their upcoming events. This is where I'll also do a final pass on the CSS and try to make sure the design of the site is solid. 

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Comments/Images for Completed Events
- [ ] Allow Non-Users to sign up and join event at same time
- [ ] View Own Past Events
- [ ] Hosts can set "Potential Games" with Attendee Polls
- [ ] Multiple Sessions
- [ ] Link to Facebook
- [ ] Make an attribution page for stock images used

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

