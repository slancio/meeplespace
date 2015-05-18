Meeplespace.Views.EventLink = Backbone.View.extend({
  tagName: 'li',

  className: 'event-link',

  template: JST['shared/event_link'],

  render: function () {
    var content = this.template({
      cityEvent: this.model,
      eventHost: this.eventHost
    });
    this.$el.html(content);

    return this;
  }

});