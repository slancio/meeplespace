window.Meeplespace = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {

    this._apiKey = meeplespacegapikey;

    this.currentUser = new Meeplespace.Models.CurrentUser();
    this.currentUser.fetch();

    this.cities = new Meeplespace.Collections.Cities();
    this.cities.fetch();

    this.navbar = new Meeplespace.Views.Navbar({ el: '.nav' });
    this.staticsRouter = new Meeplespace.Routers.StaticsRouter({
      $rootEl: $('.content')
    });
    this.cityRouter = new Meeplespace.Routers.CitiesRouter({
      $rootEl: $('.content'),
      collection: this.cities
    });
    this.userRouter = new Meeplespace.Routers.UsersRouter({
      $rootEl: $('.content'),
      collection: new Meeplespace.Collections.Users()
    });
    this.eventRouter = new Meeplespace.Routers.EventsRouter({
      $rootEl: $('.content'),
      collection: new Meeplespace.Collections.Events()
    });

    Backbone.history.start();
  }
};