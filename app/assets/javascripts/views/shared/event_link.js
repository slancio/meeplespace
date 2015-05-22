Meeplespace.Views.EventLink = Backbone.View.extend({
  tagName: 'li',

  className: 'event-link',

  template: JST['shared/event_link'],

  events: {
    'submit .confirm-attend': 'submit',
    'submit .cancel-attend': 'cancelAttend',
    'click .require-login': 'requireLogin'
  },

  initialize: function (options) {
    this.myHost = options.myHost;
    this.listenTo(this.model, "sync", this.render);
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

    $.ajax({
      url: "/api/events/" + this.model.id + "/cancel",
      type: "DELETE",
      success: function (result) {
        Backbone.history.loadUrl();
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
        Backbone.history.navigate("#events/" + that.model.id, { trigger: true });
      },
      error: function (data) {
        alert("Unable to sign you up for this event");
        console.log(data);
      }
    });
  }

});