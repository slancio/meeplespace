Meeplespace.Views.UserProfile = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._hostedEvents = this.model.hostedEvents();

    var that = this;
    this.listenTo(this.model, "sync change", function () {
      that.listenTo(that._hostedEvents, "add", that.addEventView);
      that.render();
    });
    this._hostedEvents.each(this.addEventView.bind(this));
  },

  template: JST['users/profile'],

  className: 'user-profile',

  addEventView: function (hostEvent) {
    this._eventView = new Meeplespace.Views.EventLink({
      model: hostEvent,
      myHost: this.model
    });
    this.addSubview('.events', this._eventView);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
});