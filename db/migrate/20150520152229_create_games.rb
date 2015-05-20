class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.string :img_url
      t.integer :bgg_id, null: false

      t.timestamps null: false
    end

    add_index :games, :bgg_id, unique: true
  end
end
