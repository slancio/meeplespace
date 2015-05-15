Meeplespace.Collections.Cities = Backbone.Collection.extend({
  url: "/api/cities",
  model: Meeplespace.Models.City,

  getOrFetch: function (id) {
    var cities = this;
    var city = cities.get(id);

    if (!city) {
      city = new this.model({ id: id });
      city.fetch({
        success: function () {
          cities.add(city);
        }
      });
    } else {
      city.fetch();
    }

    return city;
  }
});