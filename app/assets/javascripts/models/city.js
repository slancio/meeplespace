Meeplespace.Models.City = Backbone.Model.extend({
  urlRoot: 'api/cities',

  hosts: function () {
    if (!this._hosts) {
      this._hosts = new Meeplespace.Collections.Users([], { city: this });
    }

    return this._hosts;
  },

  cityEvents: function () {
    if (!this._cityEvents) {
      this._cityEvents = new Meeplespace.Collections.Events([], { city: this });
    }

    return this._cityEvents;
  },

  parse: function (response) {
    if (response.hosts) {
      this.hosts().set(response.hosts);
      delete response.hosts;
    }

    if (response.city_events) {
      this.cityEvents().set(response.city_events);
      delete response.city_events;
    }

    return response;
  }

});