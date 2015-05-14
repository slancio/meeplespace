Meeplespace.Views.Navbar = Backbone.View.extend({
  
  initialize: function (options) {
    this.listenTo(Meeplespace.currentUser, "signIn signOut", this.render);
    this.render();
  },

  events: {
    "click .sign-out": "signOut"
  },

  template: JST['shared/navbar'],

  render: function () {
    var content = this.template({ currentUser: Meeplespace.currentUser });
    this.$el.html(content);
    return this;
  },

  signOut: function (event) {
    event.preventDefault();
    Meeplespace.currentuser.signOut({
      success: function () {
        Backbone.history.navigate("/", { trigger: true });
      }
    });
  }

});