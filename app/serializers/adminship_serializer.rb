class AdminshipSerializer < ApplicationSerializer
  attributes :id
  has_one :admin, serializer: UserWithUsernameIdSerializer
end
