class CreateBans < ActiveRecord::Migration[5.0]
  def change
    create_table :bans do |t|
      t.references :banned_user
      t.references :banned_group

      t.timestamps
    end
  end
end
