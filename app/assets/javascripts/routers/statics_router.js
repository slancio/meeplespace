Meeplespace.Routers.StaticsRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "mainPage",
  },

  mainPage: function () {
    var homeView = new Meeplespace.Views.HomePage();
    this._swapView(homeView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


});