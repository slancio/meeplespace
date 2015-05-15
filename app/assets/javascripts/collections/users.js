Meeplespace.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Meeplespace.Models.User,

  getOrFetch: function (id) {
    var users = this;
    var user = users.get(id);

    if (!user) {
      user = new this.model({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }

    return user;
  }
});
