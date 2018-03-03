class GroupPolicy
# get assign_attributes of the instance?
  attr_reader :user, :group

    def initialize(user, group)
      @user = user
      @group = group
    end

    def update?
      user.admin? || group.admins.include?(user)
    end

# RESOURCE AKA IS GROUP
    def destroy?
      user.admin? || group.admins.include?(user)
    end

end
