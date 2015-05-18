Meeplespace.Views.EventLink = Backbone.View.extend({
  tagName: 'li',

  className: 'event-link',

  template: JST['shared/event_link'],

  initialize: function (options) {
    this._hosts = options.hosts;
  },

  render: function () {
    var content = this.template({
      cityEvent: this.model,
      eventHost: this._hosts.get(this.model.get('host_id'))
    });
    this.$el.html(content);

    return this;
  }

});