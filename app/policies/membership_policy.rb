class MembershipPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def create?
      puts !user.groups.include?(resource.group)
      # binding.pry_remote
      !user.groups.include?(resource.group) && (user.admin? || !resource.group.banned_users.include?(user))
    end

# if user is last admin of th  group, prevnet deletion of his membrship
    def destroy?
      (resource.user == user && (!resource.group.admins.include?(user) || resource.group.admins.length > 1)) || user.admin?
    end

end
