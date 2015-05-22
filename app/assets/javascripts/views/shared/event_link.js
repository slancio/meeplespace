Meeplespace.Views.EventLink = Backbone.View.extend({
  tagName: 'li',

  className: 'event-link',

  template: JST['shared/event_link'],

  events: {
    'submit .confirm-attend': 'submit',
    'submit .cancel-attend': 'cancelAttend',
    'click .require-login': 'requireLogin',
    'click .destroy-event': 'destroyEvent'
  },

  initialize: function (options) {
    this.myHost = options.myHost;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Meeplespace.currentUser, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      cityEvent: this.model,
      eventHost: this.myHost
    });
    this.$el.html(content);

    return this;
  },

  requireLogin: function (event) {
    event.preventDefault();
    Backbone.history.navigate("#session/new", { trigger: true });
  },

  cancelAttend: function (event) {
    event.preventDefault();
    var that = this;

    $.ajax({
      url: "/api/events/" + this.model.id + "/cancel",
      type: "DELETE",
      success: function (result) {
        Meeplespace.currentUser.fetch();
      }
    });
  },

  destroyEvent: function (event) {
    event.preventDefault();
    var that = this;
    this.model.destroy({
      success: function () {
        Meeplespace.currentUser.fetch();
      }
    });
  },

  submit: function (event) {
    event.preventDefault();
    var that = this;

    var outing = new Meeplespace.Models.Outing();
    outing.set('event_id', this.model.id);
    outing.save({}, {
      success: function () {
        Meeplespace.currentUser.fetch();
      },
      error: function (data) {
        alert("Unable to sign you up for this event");
        console.log(data);
      }
    });
  }

});