Meeplespace.Views.EventNew = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['events/new'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template({ myEvent: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var eventData = $form.serializeJSON().event;
    var that = this;

    this.model.set(eventData);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("events/" + that.model.id, { trigger: true });
      },
      error: function (data) {
        alert("The form contained invalid data");
        console.log(data);
      }
    });
  }

});