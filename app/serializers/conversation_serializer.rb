class ConversationSerializer < ApplicationSerializer
  attributes :id, :other_user

  has_one :sender, serializer: UserWithUsernameIdSerializer
  has_one :recipient, serializer: UserWithUsernameIdSerializer
  has_many :messages, serializer: MessageSerializer


  def other_user
    return object.sender_id == scope.id ? object.recipient : object.sender
  end

end
