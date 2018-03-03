class AddRankToAnswer < ActiveRecord::Migration[5.0]
  def change
    add_column :answers, :rank, :float
  end
end
