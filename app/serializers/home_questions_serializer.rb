class HomeQuestionsSerializer < ApplicationSerializer
  attributes :id, :title, :body, :expires_in

  has_one :user, serializer: UserWithReputationForGroupSerializer
  has_many :followings, each_serializer: FollowingSerializer
  has_one :group



end
