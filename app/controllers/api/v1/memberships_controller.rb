class Api::V1::MembershipsController < ApiController
  before_action :authenticate_user!

  def show
    m = Membership.find(params[:id])
    render json: m
  end

  def create
    group = Group.find(params[:group_id])
    m = Membership.new(user: current_user, group: group)
    authorize m
    m.save!
    puts "MEMBERSHIP THAT SHOULD BE CREATED: #{m.as_json.to_json}"
    render json: m
  end

  def destroy
      # WHY CAN'T WE DO IT DIRECTLY.

    m = Membership.find_by(user: current_user, group: Group.find(params[:group_id]))

    puts "MEMBERSHIP THAT SHOULD BE DELETED: #{m.inspect}"
    authorize m

    if (m.group.admins.include?(current_user))
      Adminship.find_by(admin: current_user, admin_group: m.group).destroy
    end

    if m.destroy
    else
    end
  end

end
