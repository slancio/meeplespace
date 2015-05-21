Meeplespace.Views.GameOption = Backbone.View.extend({
  tagName: 'option',

  attributes: function () {
    return { value: this.model.get('id') };
  },
  
  render: function () {
    this.$el.val(this.model.id);
    this.$el.html(this.model.escape('title') + " (" + this.model.get('year') + ")");

    return this;
  }
});