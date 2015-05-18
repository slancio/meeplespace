Meeplespace.Views.UserHost = Backbone.View.extend({
  template: JST['users/host'],

  events: {
    'click .become-host': 'makeHost'
  },

  className: 'user-main',

  initialize: function (options) {
    this.model = options.model;
  },

  makeHost: function (event) {
    event.preventDefault();

    this.model.set('host', true);
    var that = this;
    this.model.save({}, {
      patch: true,
      success: function () {
        Backbone.navigate("users/" + that.model.id, { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});