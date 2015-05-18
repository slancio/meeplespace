Meeplespace.Views.CityShow = Backbone.View.extend({

  initialize: function (options) {
    this._hosts = this.model.hosts();
    this._cityEvents = this.model.cityEvents();

    this.listenTo(this.model, "sync", function () {
      this.listenTo(this._hosts, "add", this.addHostView);
      this.listenTo(this._cityEvents, "add", this.addEventView);
      this.render();
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
      hosts: this.model.hosts(),
      cityEvents: this.model.cityEvents()
    });
    this.$el.html(content);

    return this;
  }

});