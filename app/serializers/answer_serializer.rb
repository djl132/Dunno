class AnswerSerializer < ApplicationSerializer
  attributes :id, :body, :points, :comment_count, :created_at

  has_one :user, serializer: UserWithReputationForGroupSerializer

  def comment_count
    object.comments.count
  end

end
