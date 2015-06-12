Meeplespace.Routers.EventsRouter = Meeplespace.Routers.MSRouter.extend({

  routes: {
    "events/new": "eventNew",
    "events/:id": "eventShow"
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
    // Making event show view public.
    // Uncomment to make it attendees(+host)-only again.
    // if (this._requireMembership(model.attendees(), model.get('host_id'))) { return; }
    var showView = new Meeplespace.Views.EventShow({
      model: model
    });
    this._swapView(showView);
  }
  
});