Meeplespace.Views.EventShow = Backbone.CompositeView.extend({
  
  initialize: function (options) {
    var that = this;
    this.listenTo(this.model, "sync", function () {
      that.initMap();
      that.render();
    });
  },

  template: JST['events/show'],

  initMap: function () {
    this._gMap = new Meeplespace.Views.ShowMap({
      location: this.model.get('location'),
      city: Meeplespace.cities.get(Meeplespace.currentUser.get('city_id')).get('name')
    });
    this.addSubview('.map', this._gMap);
    this._gMap.getMap();
  },

  render: function () {
    var content = this.template({ myEvent: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});