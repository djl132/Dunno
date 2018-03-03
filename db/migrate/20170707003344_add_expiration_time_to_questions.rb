class AddExpirationTimeToQuestions < ActiveRecord::Migration[5.0]
  def change
    remove_column :questions, :expires_on
    add_column :questions, :expires_on, :timestamp
    add_index :questions, :expires_on

  end
end
