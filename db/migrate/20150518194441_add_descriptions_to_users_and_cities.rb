class AddDescriptionsToUsersAndCities < ActiveRecord::Migration
  def change
    add_column :cities, :description, :text
    add_column :users, :short_desc, :text
    add_column :users, :long_desc, :text
  end
end
