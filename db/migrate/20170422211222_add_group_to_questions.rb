class AddGroupToQuestions < ActiveRecord::Migration[5.0]
  def change
    add_reference :questions, :group, foreign_key: true
  end
end
