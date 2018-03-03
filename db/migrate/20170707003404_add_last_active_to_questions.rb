class AddLastActiveToQuestions < ActiveRecord::Migration[5.0]
  def change
    remove_column :questions, :last_active
    add_column :questions, :last_active, :timestamp
    add_index :questions, :last_active
  end
end
