Meeplespace.Views.CityShow = Backbone.CompositeView.extend({

  initialize: function (options) {
    this._hosts = this.model.hosts();
    this._cityEvents = this.model.cityEvents();

    this.listenTo(this._hosts, "add", this.addHostView);
    this._hosts.each(this.addHostView.bind(this));
    this.listenTo(this._cityEvents, "add", this.addEventView);
    this._cityEvents.each(this.addEventView.bind(this));

    this.listenTo(this._cityEvents, "remove", this.removeEventView);

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Meeplespace.currentUser, "sync", this.render);
  },

  template: JST['cities/show'],

  className: 'city-main',

  addHostView: function (host) {
    this._hostView = new Meeplespace.Views.HostLink({ model: host });
    this.addSubview('.hosts', this._hostView);
  },

  addEventView: function (cityEvent) {
    this._eventView = new Meeplespace.Views.EventLink({
      model: cityEvent,
      myHost: this._hosts.get(cityEvent.get('host_id'))
    });
    this.addSubview('.events', this._eventView);
  },

  removeEventView: function (cityEvent) {
    this.removeModelSubview('.events', cityEvent);
  },

  render: function () {
    var content = this.template({ city: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

});