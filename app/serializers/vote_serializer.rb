class VoteSerializer < ActiveModel::Serializer
  attributes :answer
  has_one :user, serializer: UserSerializer

  class UserSerializer < ActiveModel::Serializer
    attributes :id
  end


end
