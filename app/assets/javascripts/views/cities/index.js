Meeplespace.Views.CitiesIndex = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['cities/index'],

  render: function () {
    var content = this.template({ cities: this.collection });
    this.$el.html(content);

    return this;
  },

});