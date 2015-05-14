Meeplespace.Models.City = Backbone.Model.extend({
  urlRoot: 'api/cities',

  hosts: function () {
    if (!this._hosts) {
      this._hosts = new Meeplespace.Collections.Users([], { city: this });
    }

    return this._hosts;
  },

  // events: function () {
  //   if (!this._events) {
  //     this._events = new Meeplespace.Collections.Events([], { city: this });
  //   }

  //   return this._events;
  // },

  parse: function (response) {
    if (response.hosts) {
      this.hosts().set(response.hosts);
      delete response.hosts;
    }

    // if (response.events) {
    //   this.events().set(response.events);
    //   delete response.events;
    // }

    return response;
  }

});