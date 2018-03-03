class AddPersonalityToReview < ActiveRecord::Migration[5.0]
  def change
    add_column :reviews, :friendliness, :integer
    add_column :reviews, :clarity, :integer
    add_column :reviews, :accuracy, :integer
  end
end
