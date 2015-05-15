Meeplespace.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  hostedEvents: function () {
    if (!this._hostedEvents) {
      this._hostedEvents = new Meeplespace.Collections.Events([], { user: this });
    }

    return this._hostedEvents;
  },

  myEvents: function () {
    if (!this._myEvents) {
      this._myEvents = new Meeplespace.Collections.Events([], { user: this });
    }

    return this._myEvents;
  },

  parse: function (response) {
    if (response.hosted_events) {
      this.hostedEvents().set(response.hosted_events);
      delete response.hosted_events;
    }

    if (response.attended_events) {
      this.myEvents().set(response.attended_events);
      delete response.attended_events;
    }

    return response;
  }

});

Meeplespace.Models.CurrentUser = Meeplespace.Models.User.extend({
  url: '/api/session',

  initialize: function (options) {
    this.listenTo(this, 'change', this.fireSessionEvent);
  },

  isSignedIn: function () {
    return !this.isNew();
  },

  signIn: function (options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function (data) {
        model.set(data);
        options.success && options.success();
      },
      error: function () {
        options.error && options.error();
      }
    });
  },

  signOut: function (options) {
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function (data) {
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function () {
    if (this.isSignedIn()){
      this.trigger("signIn");
      console.log(this.get('nickname') + " is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log(this.get('nickname') + " is signed out!", this);
    }
  }
});