Meeplespace.Models.Event = Backbone.Model.extend({
  urlRoot: '/api/events',

  attendees: function () {
    if (!this._attendees) {
      this._attendees = new Meeplespace.Collections.Users([], { event: this });
    }

    return this._atteendees;
  },

  parse: function (response) {
    if (response.attendees) {
      this.attendees().set(response.attendees);
      delete response.attendees;
    }

    return response;
  }

});