Meeplespace.Models.Event = Backbone.Model.extend({
  urlRoot: '/api/events',

  attendees: function () {
    if (!this._attendees) {
      this._attendees = new Meeplespace.Collections.Users([], { event: this });
    }

    return this._atteendees;
  },

  eventHost: function () {
    if (!this._eventHost) {
      this._eventHost = new Meeplespace.Models.User([], { event: this });
    }

    return this._eventHost;
  },

  parse: function (response) {
    if (response.attendees) {
      this.attendees().set(response.attendees);
      delete response.attendees;
    }

    if (response.event_host) {
      this.eventHost().set(response.event_host);
      delete response.event_host;
    }

    return response;
  }

});