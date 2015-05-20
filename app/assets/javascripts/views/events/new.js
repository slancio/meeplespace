Meeplespace.Views.EventNew = Backbone.CompositeView.extend({

  initialize: function (options) {
    if (Meeplespace.cities.length === 0) {
      this.listenToOnce(Meeplespace.cities, "sync", this.initMap);
    } else {
      this.initMap();
    }

    var that = this;
    this.listenTo(this.model, "sync change", function () {
      that._gMap.getMap();
      that.render();
    });
  },

  template: JST['events/new'],

  events: {
    'submit form': 'submit',
    'keypress #event-location': 'startTimer'
  },

  initMap: function () {
    this._gMap = new Meeplespace.Views.ShowMap({
      location: Meeplespace.cities.get(Meeplespace.currentUser.get('city_id')).get('name')
    });
    this.addSubview('.map', this._gMap);
    this._gMap.getMap();
  },

  startTimer: function (event) {
    this._gMap.$el.removeClass("hidden");
    this.timestamp = new Date().getTime();
    this._gMap._location = $(event.currentTarget).val();
    setTimeout(this.lookupLocation.bind(this), 1500);
    this.hideButton();
  },

  lookupLocation: function () {
    if ((new Date().getTime() - this.timestamp) >= 1500) {
      this._gMap.getMap($('#event-location'));
      this.unhideButton();
    }
  },

  hideButton: function () {
    $('.submit-button').addClass('hidden');
    $('.disabled-button').removeClass('hidden');
  },

  unhideButton: function () {
    $('.disabled-button').addClass('hidden');
    $('.submit-button').removeClass('hidden');
  },

  render: function () {
    var content = this.template({ myEvent: this.model });
    this.$el.html(content);
    this.attachSubviews();

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