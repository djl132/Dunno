class ConversationPolicy
# get assign_attributes of the instance?
  attr_reader :user, :resource

    def initialize(user, resource)
      @user = user
      @resource = resource
    end

    def destroy?
     (resource.recipient == user || resource.sender == user) && (resource.deleted_by_sender != user || resource.deleted_by_reciever != user)

    end

    def show?
      resource.recipient == user || resource.sender == user
    end

 end
