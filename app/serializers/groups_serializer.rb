class GroupsSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :member_count

has_many :banned_users, each_serializer: UserWithUsernameIdSerializer
has_many :admins, each_serializer: UserWithUsernameIdSerializer

has_many :memberships, each_serializer: MembershipSerializer
  def member_count
    object.memberships.count
  end

end
