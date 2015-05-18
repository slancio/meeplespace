Meeplespace.Views.UserProfile = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._hostedEvents = this.model.hostedEvents();

    var that = this;
    this.listenTo(this.model, "sync change", function () {
      that._hostedEvents.each(that.addEventView.bind(that));
      that.render();
    });
  },

  template: JST['users/profile'],

  className: 'user-profile',

  addEventView: function (hostEvent) {
    if (this._hostedEvents.where(hostEvent) !== []) {
      this.removeModelSubview('.events', hostEvent);
    }
    
    this._eventView = new Meeplespace.Views.EventLink({
      model: hostEvent,
      myHost: this.model
    });
    this.addSubview('.events', this._eventView);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});