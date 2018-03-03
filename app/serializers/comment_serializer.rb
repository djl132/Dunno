class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :reply_count
  # has_one :answer, serializer: AnswerSerializer
  has_one :user, serializer: UserWithReputationForGroupSerializer

  def reply_count
    object.children.count
  end

end
