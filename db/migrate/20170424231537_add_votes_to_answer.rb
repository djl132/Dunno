class AddVotesToAnswer < ActiveRecord::Migration[5.0]
  def change
    add_column :answers, :upvotes, :integer
    add_column :answers, :downvotes, :integer
  end
end
