Meeplespace.Views.UserHost = Backbone.View.extend({
  template: JST['users/host'],

  events: {
    'click .become-host': 'makeHost'
  },

  className: 'user-main',

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(Meeplespace.currentUser, "sync change", this.render);
  },

  makeHost: function (event) {
    event.preventDefault();

    this.model.set('host', true);
    var that = this;
    this.model.save({}, {
      success: function () {
        Meeplespace.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("users/" + that.model.id, { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});