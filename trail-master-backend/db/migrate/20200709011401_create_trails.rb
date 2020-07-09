class CreateTrails < ActiveRecord::Migration[6.0]
  def change
    create_table :trails do |t|
      t.string :name
      t.string :location
      t.integer :difficulty
      t.string :completion_time
      t.integer :elevation_gain

      t.timestamps
    end
  end
end
