Meeplespace.Views.HomePage = Backbone.View.extend({
  
  className: 'home-page',

  template: JST['shared/home_page'],

  render: function () {
    var content = this.template({ currentUser: Meeplespace.currentUser });
    this.$el.html(content);
    return this;
  }

});