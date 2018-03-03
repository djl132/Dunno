class ConversationWithOtherUserSerializer < ApplicationSerializer
  attributes :id, :other_user

    def other_user
      return object.sender_id == scope.id ? object.recipient : object.sender
    end

end
