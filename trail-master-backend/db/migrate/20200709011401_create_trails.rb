class CreateTrails < ActiveRecord::Migration[6.0]
  def change
    create_table :trails do |t|
      t.string :name
      t.string :start_location
      t.string :end_location
      t.integer :distance
      t.integer :difficulty
      t.integer :completion_time
      t.integer :elevation_gain
      t.string :image_url

      t.timestamps
    end
  end
end
