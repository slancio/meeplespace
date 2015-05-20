class AddGameToEvents < ActiveRecord::Migration
  def change
    add_column :events, :game_id, :integer, null: false
    add_index :events, :game_id
  end
end
