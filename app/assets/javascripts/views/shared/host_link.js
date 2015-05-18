Meeplespace.Views.HostLink = Backbone.View.extend({
  tagName: 'li',

  className: 'host-link',

  template: JST['shared/host_link'],

  initialize: function (options) {
    this.render();
  },

  render: function () {
    var content = this.template({ host: this.model });
    this.$el.html(content);

    return this;
  }
});