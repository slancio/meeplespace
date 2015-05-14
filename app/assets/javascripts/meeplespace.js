window.Meeplespace = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {

    this.currentUser = new Meeplespace.Models.CurrentUser();
    this.currentUser.fetch();

    this.cities = new Meeplespace.Collections.Cities();
    this.cities.fetch();

    this.navbar = new Meeplespace.Views.Navbar({ el: '.nav' });
    this.cityRouter = new Meeplespace.Routers.CitiesRouter({ $rootEl: $('.content')});
    this.userRouter = new Meeplespace.Routers.UsersRouter({ $rootEl: $('.content')});

    Backbone.history.start();
  }
};