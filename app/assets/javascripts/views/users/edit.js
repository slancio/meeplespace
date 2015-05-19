Meeplespace.Views.UserEdit = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(Meeplespace.cities, "sync", this.render);
  },

  template: JST['users/edit'],

  events: {
    'submit form': 'submit',
    'change .upload-avatar': 'uploadAvatar'
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  },

  uploadAvatar: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      that._updatePreview(reader.result);
      that.model._avatar = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._avatar;
    }
  },

  _updatePreview: function (src) {
    this.$el.find(".preview-avatar").attr("src",src);
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);
    this.model.save({}, {
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