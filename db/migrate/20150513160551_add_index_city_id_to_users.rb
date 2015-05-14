class AddIndexCityIdToUsers < ActiveRecord::Migration
  def change
    add_index :users, :city_id
  end
end
