class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :friendliness, :clarity, :accuracy
  has_one :reviewer, serializer: UserWithUsernameIdSerializer
  has_one :reviewed, serializer: UserWithUsernameIdSerializer
end
