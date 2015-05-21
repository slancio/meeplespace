Meeplespace.Views.GameOption = Backbone.View.extend({
  tagName: 'option',

  attributes: function () {
    return { value: this.model.get('id') };
  },
  
  render: function () {
    this.$el.val(this.model.id);
    var year = this.model.get('year');
    if (year === null && typeof year === "object") {
      this.$el.html(this.model.escape('title'));
    } else {
      this.$el.html(this.model.escape('title') + " (" + this.model.get('year') + ")");
    }

    return this;
  }
});