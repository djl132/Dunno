class Api::V1::AdminshipsController < ApiController
  before_action :authenticate_user!

  def create
    group = Group.find(params[:group_id])
    adminship = Adminship.new(admin_group: group, admin: User.find(params[:user_id]))
    authorize adminship
    adminship.save!
    render json: adminship
  end

  def destroy
    adminship = Adminship.find_by(admin_group_id: params[:group_id], admin_id: params[:user_id])
    authorize adminship
    adminship.destroy
  end

end
