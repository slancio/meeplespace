Meeplespace.Views.ShowMap = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  render: function () {
    return this;
  },

  initialize: function (options) {
    this._city = options.city;
    this._location = options.location;
  },

  getMap: function ($formField) {
    var that = this;
    if ($formField) {
      this.$formField = $formField;
    }

    if (this._location.indexOf(",") === -1) {
      this._location += (", " + this._city);
    }

    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" +
           this._location + "&" + Meeplespace._apiKey,
      dataType: "json",
    }).done(function (data) {
      if (data.status === "ZERO_RESULTS") {
        that.$el.addClass("hidden");
        if (that.$formField) {
          that.$formField.val("");
          alert("Search returned no results");
        }
        return;
      }

      that._MSLat = data.results[0].geometry.location.lat;
      that._MSLong = data.results[0].geometry.location.lng;
      that.showMap();

      if (that.$formField) {
        that.$formField.val(data.results[0].formatted_address);
      }
    });
  },

  showMap: function () {

    var mapOptions = {
      center: { lat: this._MSLat, lng: this._MSLong },
      zoom: 15
    };

    this._map = new google.maps.Map(this.el, mapOptions);
    new google.maps.Marker({
      position: { lat: this._MSLat, lng: this._MSLong },
      map: this._map
    });
  }
});