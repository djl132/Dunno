class AddDeletionDataToConversation < ActiveRecord::Migration[5.0]
  def change
    add_reference :conversations, :deleted_by_reciever
    add_reference :conversations, :deleted_by_sender
  end
end
