class MessageSerializer < ActiveModel::Serializer

  attributes :id, :body, :created_at

  has_one :user, serializer: UserWithUsernameIdSerializer

end
