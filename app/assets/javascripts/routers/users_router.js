Meeplespace.Routers.UsersRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
  },

  routes: {
    "signup": "userNew",
    "users/:id": "userShow",
    "session/new": "signIn"
  },

  userNew: function () {
    if (!this._requireSignedOut()) { return; }

    var model = new this._userCollection.model();
    var formView = new Meeplespace.Views.UsersForm({
      collection: this._userCollection,
      model: model
    });
    this._swapView(formView);
  },

  userShow: function (id) {
    var model = this._userCollection.getOrFetch(id);
    var showView = new Meeplespace.Views.UsersShow({
      model: model
    });
    this._swapView(showView);
  },

  signIn: function (callback) {
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Meeplespace.Views.SignIn({ callback: callback });
    this._swapView(signInView);
  },

  _requireSignedIn: function (callback) {
    if (!Meeplespace.currentUser.isSigned()) {
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

  _goHome: function () {
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});