Meeplespace.Views.CityShow = Backbone.View.extend({

  initialize: function (options) {
    this._hosts = this.model.hosts();
    this._hosts.fetch();
    this._cityEvents = this.model.cityEvents();
    this._cityEvents.fetch();

    this.listenTo(this.model, "sync", function () {
      var that = this;
      this.listenTo(this._hosts, "sync", function () {
        that._hosts.each(function (host) {
          that.addHostView(host);
        });
        that.listenTo(this._cityEvents, "sync", function () {
          that._cityEvents.each(function (cityEvent) {
            that.addEventView(cityEvent);
          });
          that.render();
        });
      });
    });
  },

  template: JST['cities/show'],

  className: 'city-main',

  addHostView: function (host) {
    this._hostView = new Meeplespace.Views.HostLink({ model: host });
    this.$('.hosts').append(this._hostView);
  },

  addEventView: function (cityEvent) {
    this._eventView = new Meeplespace.Views.EventLink({
      model: cityEvent,
      eventHost: cityEvent.eventHost()
    });
    this.$('.events').append(this._eventView);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      hosts: this._hosts,
      cityEvents: this._cityEvents
    });
    this.$el.html(content);

    return this;
  }

});