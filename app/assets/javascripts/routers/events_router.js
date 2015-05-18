Meeplespace.Routers.EventsRouter = Meeplespace.Routers.MSRouter.extend({

  routes: {
    "events/new": "eventNew",
    "events/:id": "eventShow",
    "events/:id/edit": "eventEdit"
  },

  eventNew: function () {
    var callback = this.eventNew.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    if (this._requireHost()) { return; }

    var model = new this.collection.model();
    var newView = new Meeplespace.Views.EventNew({
      collection: this.collection,
      model: model
    });
    this._swapView(newView);
  },

  eventShow: function (id) {
    var callback = this.eventShow.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var model = this.collection.getOrFetch(id);
    if (this._requireMembership(model.attendees())) { return; }
    var showView = new Meeplespace.Views.EventShow({
      model: model
    });
    this._swapView(showView);
  },

  eventEdit: function (id) {
    var callback = this.userEdit.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var model = this.collection.getOrFetch(id);
    if (this._requireAccess(model.host_id)) { return; }
    var editView = new Meeplespace.Views.EventEdit({
      collection: this.collection,
      model: model
    });
    this._swapView(editView);
  }

});