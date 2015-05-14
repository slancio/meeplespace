class AddHostToUsersAndEvents < ActiveRecord::Migration
  def change
    add_column :users, :host, :boolean, null: false, default: false
    add_column :events, :host_id, :integer, null: false
    add_index :events, :host_id
  end
end
