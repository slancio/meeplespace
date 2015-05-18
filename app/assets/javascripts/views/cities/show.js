Meeplespace.Views.CityShow = Backbone.CompositeView.extend({

  initialize: function (options) {
    this._hosts = this.model.hosts();
    this._hosts.fetch();
    this._cityEvents = this.model.cityEvents();
    this._cityEvents.fetch();

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this._hosts, "add", this.addHostView);
    this._hosts.each(this.addHostView.bind(this));
    this.listenTo(this._cityEvents, "add", this.addEventView);
    this._cityEvents.each(this.addEventView.bind(this));
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
      eventHost: cityEvent.eventHost()
    });
    this.addSubview('.events', this._eventView);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      hosts: this._hosts,
      cityEvents: this._cityEvents
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

});