class Api::V1::GroupsController < ApiController
  before_action :authenticate_user!

  def index
      groups = Group.includes(:memberships).paginate(page: params[:page], per_page: 10)
      render json: groups, root: :groups, each_serializer: GroupsSerializer, adapter: :json, meta: {isLastPage: isLastPage(groups)}
  end

# CHECK SEARCH_GROUP
  def search_for_group
    if name = params[:name]
      # name.sanitize()
        groups = Group.includes(:banned_users, memberships: :user, adminships: [:admin,:admin_group]).where('name ILIKE ?', "%#{name}%").paginate(page: params[:page], per_page: 20)
        render json: groups,
        adapter: :json,
        meta: {isLastPage: isLastPage(groups)}
    end
  end

  def edit_name
    g = Group.find(params[:group_id])
    g.update_attributes(description: params[:description])
  end

  def create
      g = Group.new(group_params)
      if g.valid?
        g.save
        g.adminships.create(admin: current_user)
        g.memberships.create(user: current_user)
        render json: g, include: [memberships: :user]
      else
        render json: {
          success: false,
          errors: render_errors(g.errors)
        }, status: 422
      end
  end

  def update
    group = Group.find(params[:id])
    authorize group
    if group.update_attributes(group_params)
      render json: group, root: nil
    else
      render json: {
        success: false,
        errors: render_errors(group.errors)
      }, status: 422
    end
  end

  def destroy
    group = Group.find(params[:id])
    authorize group
    if group.destroy
      render json:{
        success: true
      }, status: 200
    end
  end

# TEST IF GROUP DECREASES QUERIES BY AMS.
 def show
   group = Group.includes(:questions, :users, :banned_users, :adminships, bans: :banned_user, memberships: :user).find(params[:id])
   render json: group, serializer: GroupSerializer, group_name: group.name
 end

# creates another hash that is strong PARAMETERIZED, FILTERED for MASS ASSIGNMENT.
   private
   def group_params
      params.require(:group).permit(:name, :description, :avatar)
   end

   def render_errors(errors_for_object)
     result = []
       errors_for_object.messages.each {|key, errors_for_attr|
             errors_for_attr.each {|error|
               key_value = (key.to_s).capitalize
               result << "#{key_value} #{error}"
           }
     }
    puts result
     result
   end

end
