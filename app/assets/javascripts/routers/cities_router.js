Meeplespace.Routers.CitiesRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new Meeplespace.Collections.Cities();
    this.collection.fetch();
  },

  routes: {
    "cities/": "cityIndex",
    "cities/:id": "cityShow"
  },

  cityIndex: function () {
    var indexView = new Meeplespace.Views.CitiesIndex({ collection: this.collection });
    this._swapView(indexView);
  },

  cityShow: function (id) {
    var model = this.collection.getOrFetch(id);
    var showView = new Meeplespace.Views.CityShow({ model: model });
    this._swapView(cityShow);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});