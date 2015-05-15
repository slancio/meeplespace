Meeplespace.Routers.UsersRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
    this.collection.fetch();
  },

  routes: {
    "signup": "userNew",
    "users/new": "userNew",
    "users/:id": "userShow",
    "users/:id/edit": "userEdit",
    "session/new": "signIn"
  },

  userNew: function () {
    if (!this._requireSignedOut()) { return; }

    var model = new this.collection.model();
    var newView = new Meeplespace.Views.UserNew({
      collection: this.collection,
      model: model
    });
    this._swapView(newView);
  },

  userShow: function (id) {
    var model = this.collection.getOrFetch(id);
    var showView = new Meeplespace.Views.UserShow({
      model: model
    });
    this._swapView(showView);
  },

  userEdit: function (id) {
    var callback = this.userEdit.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var model = this.collection.getOrFetch(id);
    var editView = new Meeplespace.Views.UserEdit({
      collection: this.collection,
      model: model
    });
    this._swapView(editView);
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

  _goHome: function () {
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});