class AddAvatarForGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :avatar, :text
  end
end
