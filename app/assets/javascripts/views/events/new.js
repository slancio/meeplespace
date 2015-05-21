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

    this._gameSearchResults = new Meeplespace.Collections.Games();
    this.listenTo(this._gameSearchResults, "add", this.addGame);
    this.listenTo(this._gameSearchResults, "remove", this.removeGame);
  },

  template: JST['events/new'],

  events: {
    'submit form': 'submit',
    'keypress #event-location': 'startMapTimer',
    'keypress #game-search': 'startGameTimer'
  },

  initMap: function () {
    this._gMap = new Meeplespace.Views.ShowMap({
      location: Meeplespace.cities.get(Meeplespace.currentUser.get('city_id')).get('name'),
      city: Meeplespace.cities.get(Meeplespace.currentUser.get('city_id')).get('name')
    });
    this.addSubview('.map', this._gMap);
    this._gMap.getMap();
  },

  startMapTimer: function (event) {
    this._gMap.$el.removeClass("hidden");
    this.mapTimestamp = new Date().getTime();
    this._gMap._location = $(event.currentTarget).val();
    setTimeout(this.lookupLocation.bind(this), 1200);
    this.hideButton();
  },

  startGameTimer: function (event) {
    $('.disabled-option').removeClass('hidden');

    this._gameSearchResults.each(function (result) {
      this._gameSearchResults.remove(result);
    }.bind(this));

    this._searchTitle = $(event.currentTarget).val();
    this.gameTimestamp = new Date().getTime();
    setTimeout(this.lookupGame.bind(this), 1200);
    this.hideButton();
  },

  lookupLocation: function () {
    if ((new Date().getTime() - this.mapTimestamp) >= 1200) {
      this._gMap.getMap($('#event-location'));
      this.unhideButton();
    }
  },

  lookupGame: function () {
    if ((new Date().getTime() - this.gameTimestamp) >= 1200) {
      this._gameSearchResults.fetch({
        data: { title: $('#game-search').val() },
        success: function () {
          $('#game-search').val("");
          $('.disabled-option').addClass('hidden');
          $('#event-game-label').html("Choose Game");
          $('#game-search-label').empty();
          this.unhideButton();
        }.bind(this)
      });
    }
  },

  removeGame: function (game) {
    this.removeModelSubview("#event-game", game);
  },

  addGame: function (game) {
    this._gameView = new Meeplespace.Views.GameOption({ model: game });
    this.addSubview("#event-game", this._gameView);
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
    this.$('#event-date').combodate({
      yearDescending: true,
      minYear: parseInt(moment().format('YYYY'), 10),
      maxYear: parseInt(moment().format('YYYY'), 10) + 1,
      minuteStep: 15,
      smartDays: true
    });
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