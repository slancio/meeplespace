Meeplespace.Views.Footer = Backbone.View.extend({

  initialize: function (options) {
    this.render();
  },

  template: JST['shared/footer'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});