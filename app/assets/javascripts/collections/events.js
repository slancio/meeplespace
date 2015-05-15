Meeplespace.Collections.Events = Backbone.Collection.extend({
  url: "/api/events",
  model: Meeplespace.Models.Event,

  getOrFetch: function (id) {
    var events = this;
    var myEvent = events.get(id);

    if (!myEvent) {
      myEvent = new this.model({ id: id });
      myEvent.fetch({
        success: function () {
          events.add(myEvent);
        }
      });
    } else {
      myEvent.fetch();
    }

    return myEvent;
  }
});