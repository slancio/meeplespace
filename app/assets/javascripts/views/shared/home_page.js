Meeplespace.Views.HomePage = Backbone.View.extend({
  
  initialize: function (options) {
    this.listenTo(Meeplespace.cities, "sync", this.render);
    this.render();
  },

  className: 'home-page',

  template: JST['shared/home_page'],

  render: function () {
    var content = this.template({ currentUser: Meeplespace.currentUser });
    this.$el.html(content);
    return this;
  }

});