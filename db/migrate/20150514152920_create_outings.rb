class CreateOutings < ActiveRecord::Migration
  def change
    create_table :outings do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :outings, [:event_id, :user_id], unique: true
  end
end
