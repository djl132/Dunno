class CreateAdminships < ActiveRecord::Migration[5.0]
  def change
    create_table :adminships do |t|
      t.references :admin
      t.references :admin_group

      t.timestamps
    end
  end
end
