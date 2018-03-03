class UserSerializer < ApplicationSerializer
  attributes :id, :username, :reputation_level, :role

  has_many :conversations, each_serializer: ConversationWithOtherUserSerializer
  has_many :groups, each_serializer: GroupWithNameSerializer

end
