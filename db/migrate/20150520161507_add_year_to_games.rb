class AddYearToGames < ActiveRecord::Migration
  def change
    add_column :games, :year, :integer
  end
end
