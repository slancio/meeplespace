Meeplespace.Views.AttendeeLink = Backbone.View.extend({
  tagName: 'li',

  className: 'attendee-link',

  template: JST['shared/attendee_link'],

  render: function () {
    var content = this.template({ attendee: this.model });
    this.$el.html(content);

    return this;
  }
});