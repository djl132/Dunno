class ReviewPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def create?
      user != resource.reviewed
    end

    def update?
      user == resource.reviewer || user.admin?
    end

    def destroy?
      user == resource.reviewer || user.admin?
    end
end
