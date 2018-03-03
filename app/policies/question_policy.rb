class QuestionPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def create?
        !resource.group.banned_users.include?(user)
    end

    def update?
       !resource.group.banned_users.include?(user) && (user.admin? || resource.user == user || resource.group.admins.include?(user))
    end

    def destroy?
      !resource.group.banned_users.include?(user) && (user.admin? || resource.user == user || resource.group.admins.include?(user))
    end

end
