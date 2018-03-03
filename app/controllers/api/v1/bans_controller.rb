class Api::V1::BansController < ApiController
  before_action :authenticate_user!

  def create
    g = Group.find(params[:group_id])
    u = User.find(params[:user_id])
    ban = Ban.new(banned_group: g, banned_user: u)
    authorize ban
    ban.save!

    u.memberships.find_by(group: g).destroy
    render json: ban, status: 200;
  end

  def destroy
    ban = Ban.find_by(banned_group_id: params[:group_id], banned_user_id: params[:user_id])
    puts "THIS IS THE BAN: #{ban.inspect}"

    authorize ban
    ban.destroy
    Membership.create(user_id: params[:user_id], group_id: params[:group_id])

    render json: {}, status: 200;
  end
end
