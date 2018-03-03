class MembershipSerializer < ApplicationSerializer
  attributes :id
  has_one :user, serializer: UserWithUsernameIdSerializer
end
