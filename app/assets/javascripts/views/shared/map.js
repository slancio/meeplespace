Meeplespace.Views.ShowMap = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  render: function () {
    return this;
  },

  initialize: function (options) {
    this._location = options.location;
  },

  getMap: function (addressField) {
    var that = this;

    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" +
           this._location +
           "&key=" +
           Meeplespace._apiKey,
      dataType: "json",
    }).done(function (data) {
      console.log(data.results[0].geometry);
      that._MSLat = data.results[0].geometry.location.lat;
      that._MSLong = data.results[0].geometry.location.lng;
      that._location = data.results[0].formatted_address;
      that.showMap();
    });
  },

  showMap: function () {

    var mapOptions = {
      center: { lat: this._MSLat, lng: this._MSLong },
      zoom: 15
    };

    this._map = new google.maps.Map(this.el, mapOptions);
  }
});