class AddIndexOnConversations < ActiveRecord::Migration[5.0]
  def change
    add_index :conversations, :sender_id
  add_index :conversations, :recipient_id
  end
end
