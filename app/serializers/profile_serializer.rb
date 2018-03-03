class ProfileSerializer < ApplicationSerializer

  attributes :reputation_for_topics, :bio, :username, :major, :avatar, :reputation_level, :friendlyPoints, :accuracyPoints, :clarityPoints

  has_many :groups, each_serializer: GroupWithNameSerializer
  has_many :reviews_by_others

  class GroupSerializer < ActiveModel::Serializer
    attributes :id, :name, :description
  end

end
