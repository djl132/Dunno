class AnswerPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def update?
      !resource.question.group.banned_users.include?(user) && (resource.user == user || resource.question.group.admins.include?(user) || user.admin?)
    end

    def create?
      !resource.question.group.banned_users.include?(user)
    end

    def destroy?
      resource.user == user || resource.question.group.admins.include?(user) || user.admin?
    end


end
