class QuestionWithUserSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :expires_in, :created_at, :answer_count, :followers_count
  has_one :user, serializer: UserWithReputationForGroupSerializer
  has_many :followings

  def answer_count
    object.answers.count
  end

  def followers_count
    object.followings.count
  end
end
