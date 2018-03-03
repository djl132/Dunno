class CreateFollowings < ActiveRecord::Migration[5.0]
  def change
    create_table :followings do |t|
      t.references :following_user
      t.references :following_question

      t.timestamps
    end
  end
end
