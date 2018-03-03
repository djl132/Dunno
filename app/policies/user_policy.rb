class UserPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def update?
      user.admin? || resource.id == user.id
    end

    def destroy?
      user.admin? || resource.id == user.id
    end

end
