class GroupSerializer < ActiveModel::Serializer
  attributes :id, :description, :avatar, :name



  has_many :questions, each_serializer: QuestionWithUserSerializer

# cinclues means that I would like to sue this assoicaoitn int he serializer when referring to this model from this resource.
  has_many :adminships, each_serializer: AdminshipSerializer
  has_many :users, each_serializer: UserWithReputationForGroupSerializer

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :reputation_for_topic

    def reputation_for_topic
      object.reputation_for_topics(serialization_options[:group_name])
    end

  end
  has_many :memberships, each_serializer: MembershipSerializer
  has_many :admins, each_serializer: UserWithUsernameIdSerializer
  has_many :banned_users, each_serializer: UserWithUsernameIdSerializer
  # groupNav will ahv eot know which users are banned and are admin for UI.

  # HAS MANY GIVES YOU THE SERIALIZED ASSOCIATION

  # class MembershipSerializer < ActiveModel::Serializer
  #   attributes :id, :user, :group
  #
  # end

end
