class AddOwnerToConversation < ActiveRecord::Migration[5.0]
  def change
    add_reference :conversations, :owner
  end
end
