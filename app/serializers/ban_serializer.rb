class BanSerializer < ActiveModel::Serializer
  attributes :id

  has_one :banned_user, serializer: UserWithUsernameIdSerializer

end
