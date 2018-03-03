
class AddProfileToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :bio, :text
    add_column :users, :classes, :text
    add_column :users, :major, :text
  end
end
