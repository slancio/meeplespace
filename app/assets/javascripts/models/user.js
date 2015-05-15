Meeplespace.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };
    return json;
  },
  // hosted_events: function () {
  //   if (!this._hosted_events) {
  //     this._hosted_events = new Meeplespace.Collections.Events([], { user: this });
  //   }

  //   return this._hosted_events;
  // },

  // events: function () {
  //   if (!this._events) {
  //     this._events = new Meeplespace.Collections.Events([], { user: this });
  //   }

  //   return this._events;
  // },

  // parse: function (response) {
  //   if (response.hosted_events) {
  //     this.hosted_events().set(response.hosted_events);
  //     delete response.hosted_events;
  //   }

  //   if (response.events) {
  //     this.events().set(response.events);
  //     delete response.events;
  //   }

  //   return response;
  // }

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