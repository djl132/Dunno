class ConversationWithLastMessageSerializer < ApplicationSerializer
  attributes :id, :other_user, :last_message
  def other_user
    return object.sender_id == scope.id ? object.recipient_id : object.sender_id
  end

  def last_message
    object.messages.last
  end

end
