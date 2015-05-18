Meeplespace.Views.EventLink = Backbone.View.extend({
  tagName: 'li',

  className: 'event-link',

  template: JST['shared/event_link'],

  initialize: function (options) {
    this.myHost = options.myHost;
  },

  render: function () {
    var content = this.template({
      cityEvent: this.model,
      eventHost: this.myHost
    });
    this.$el.html(content);

    return this;
  }

});