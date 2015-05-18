Meeplespace.Views.EventLink = Backbone.View.extend({
  tagName: 'li',

  className: 'event-link',

  template: JST['shared/event_link'],

  initialize: function (options) {
    this.render();
  },

  render: function () {
    var content = this.template({
      cityEvent: this.model,
      eventHost: this.model.eventHost()
    });
    this.$el.html(content);

    return this;
  }

});