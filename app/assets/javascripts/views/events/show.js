Meeplespace.Views.EventShow = Backbone.CompositeView.extend({
  
  initialize: function (options) {
    this._attendees = this.model.attendees();
    this._eventHost = this.model.eventHost();

    this.listenTo(this._attendees, "add", this.addAttendeeView);
    this._attendees.each(this.addAttendeeView.bind(this));

    var that = this;
    this.listenTo(this.model, "sync", function () {
      that.initMap({ location: this.model.escape('location') });
      that.render();
      that.addHostView(that._eventHost);
    });
  },

  template: JST['events/show'],

  addAttendeeView: function (attendee) {
    this._attendeeView = new Meeplespace.Views.AttendeeLink({ model: attendee });
    this.addSubview('.attendees', this._attendeeView);
  },

  addHostView: function (host) {
    this._hostView = new Meeplespace.Views.HostLink({ model: host });
    this.addSubview('.host', this._hostView);
  },

  initMap: function () {
    this._gMap = new Meeplespace.Views.ShowMap({
      location: this.model.get('location'),
      city: Meeplespace.cities.get(Meeplespace.currentUser.get('city_id')).get('name')
    });
    this.addSubview('.map', this._gMap);
    this._gMap.getMap();
    this._gMap.$el.removeClass("hidden");
  },

  render: function () {
    var content = this.template({ myEvent: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});