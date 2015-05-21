Meeplespace.Collections.Games = Backbone.Collection.extend({
  url: 'api/games/search',
  model: Meeplespace.Models.Game,

  comparator: function (game) {
    return game.get('title');
  },
});