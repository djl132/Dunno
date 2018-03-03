class CommentPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def create?
      !resource.root.answer.question.group.banned_users.include?(user)
    end

    def update?
      !resource.root.answer.question.group.banned_users.include?(user) && (resource.user == user || resource.root.answer.question.group.admins.include?(user) || user.admin?)
    end

    def destroy?
      !resource.root.answer.question.group.banned_users.include?(user) && (resource.user == user || resource.root.answer.question.group.admins.include?(user) || user.admin?)
    end

end
