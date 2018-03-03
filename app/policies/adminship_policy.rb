class AdminshipPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def create?
      user.admin? || resource.admin_group.admins.include?(user)
    end

# MUST BE CREATOR OF APP (ADIM ROLE) OR ADMIN OF TH EGORUP, ND MUST NOT BE THE LAST ADMIN()
    def destroy?
      user == resource.admin && resource.admin_group.admins.length > 1
    end

end
