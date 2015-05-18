Meeplespace.Routers.UsersRouter = Meeplespace.Routers.MSRouter.extend({

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
    if (this._requireAccess(id)) { return; }

    var model = this.collection.getOrFetch(id);
    var editView = new Meeplespace.Views.UserEdit({
      collection: this.collection,
      model: model
    });
    this._swapView(editView);
  }
});