Meeplespace.Routers.UsersRouter = Meeplespace.Routers.MSRouter.extend({

  routes: {
    "signup": "userNew",
    "users/new": "userNew",
    "users/:id": "userShow",
    "users/:id/edit": "userEdit",
    "users/:id/host": "userHost",
    "users/:id/profile": "userProfile",
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
    if (this._requireAccess(id)) { return; }
    
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
  },

  userHost: function (id) {
    if (this._requireAccess(id)) { return; }
    if (this._requireNotHost(id)) { return; }

    var model = this.collection.getOrFetch(id);
    var hostView = new Meeplespace.Views.UserHost({
      model: model,
      collection: this.collection
    });
    this._swapView(hostView);
  },

  userProfile: function (id) {
    var model = this.collection.getOrFetch(id);
    var profileView = new Meeplespace.Views.UserProfile({
      model: model
    });
    this._swapView(profileView);
  }
});