class ChildCommentSerializer < ActiveModel::Serializer
  attributes :id, :body
  # has_one :answer, serializer: AnswerSerializer
  has_one :user, serializer: UserWithReputationForGroupSerializer
end
