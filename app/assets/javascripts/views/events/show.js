Meeplespace.Views.EventShow = Backbone.CompositeView.extend({
  
  initialize: function (options) {
    var that = this;
    this.listenTo(this.model, "sync change", function () {
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

  startTimer: function (event) {
    this.timestamp = new Date().getTime();
    this._gMap._location = $(event.currentTarget).val();
    setTimeout(this.lookupLocation.bind(this), 1500);
  },

  lookupLocation: function () {
    if ((new Date().getTime() - this.timestamp) >= 1500) {
      this._gMap.getMap($('#event-location'));
    }
  },

  render: function () {
    var content = this.template({ myEvent: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});