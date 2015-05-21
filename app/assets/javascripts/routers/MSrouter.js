Meeplespace.Routers.MSRouter = Backbone.Router.extend({
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
    this.collection.fetch();
  },

  signIn: function (callback) {
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Meeplespace.Views.SignIn({ callback: callback });
    this._swapView(signInView);
  },

  _requireSignedIn: function (callback) {
    if (!Meeplespace.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);

      return false;
    }

    return true;
  },

  _requireSignedOut: function (callback) {
    if (Meeplespace.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();

      return false;
    }

    return true;
  },

  _requireAccess: function (id) {
    if (Meeplespace.currentUser.id === parseInt(id, 10)) {
      return false;
    }

    Backbone.history.navigate("", { trigger: true });
    return true;
  },

  _requireHost: function () {
    if (Meeplespace.currentUser.get('host') === true) {
      return false;
    }

    Backbone.history.navigate("", { trigger: true });
    return true;
  },

  _requireNotHost: function () {
    if (Meeplespace.currentUser.get('host') !== true) {
      return false;
    }

    Backbone.history.navigate("", { trigger: true });
    return true;
  },

  _requireMembership: function(collection, id) {
    if (collection.contains(Meeplespace.currentUser)) {
      return false;
    }

    if (id === Meeplespace.currentUser.id) {
      return false;
    }

    Backbone.history.navigate("", { trigger: true });
    return true;
  },

  _goHome: function () {
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});