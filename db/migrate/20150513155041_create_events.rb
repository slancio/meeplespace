class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.date :date, null:false
      t.string :location, null:false
      t.boolean :location_privacy, null: false, default: false
      t.integer :slots, null: false

      t.timestamps null: false
    end

    add_index :events, :date
  end
end
