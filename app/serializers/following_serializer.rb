class FollowingSerializer < ActiveModel::Serializer
  attributes :id

  has_one :following_user, serializer: UserWithUsernameIdSerializer
end
