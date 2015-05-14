class AddCityToUsers < ActiveRecord::Migration
  def change
    add_column :users, :city_id, :integer, null: false
  end
end
