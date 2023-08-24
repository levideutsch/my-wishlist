class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.string :product_url
      t.string :color
      t.integer :user_id
      t.integer :category_id

      t.timestamps
    end
  end
end
