Meeplespace.Views.UserEdit = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(Meeplespace.cities, "sync", this.render);
  },

  template: JST['users/edit'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);
    this.model.save({}, {
      patch: true,
      success: function () {
        Meeplespace.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("users/" + that.model.id, { trigger: true });
      },
      error: function (data) {
        alert("The form contained invalid data");
        console.log(data);
      }
    });
  }

});