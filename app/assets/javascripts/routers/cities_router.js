Meeplespace.Routers.CitiesRouter = Meeplespace.Routers.MSRouter.extend({

  routes: {
    "cities": "cityIndex",
    "cities/:id": "cityShow"
  },

  cityIndex: function () {
    var indexView = new Meeplespace.Views.CitiesIndex({ collection: this.collection });
    this._swapView(indexView);
  },

  cityShow: function (id) {
    var model = this.collection.getOrFetch(id);
    var showView = new Meeplespace.Views.CityShow({ model: model });
    this._swapView(showView);
  }

});