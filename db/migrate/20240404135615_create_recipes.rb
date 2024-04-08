class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :cuisine
      t.integer :cook_time
      t.integer :prep_time
      t.text :image
      t.text :author
      t.text :category
      t.integer :ratings

      t.timestamps
    end
  end
end
