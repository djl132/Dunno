class Api::V1::StatusesController < ApiController
  before_action :authenticate_user!

  def create
    newStatus = Status.create(text: params[:text], user: current_user)
    render json: newStatus
  end

  def destroy
    status = Status.find(params[:id])
    status.destroy
    status.save
  end

  def update
    updatedStatus = Status.find(params[:id])
    updatedStatus.update_attributes!(text: params[:text], user: current_user)
    updatedStatus.save
    render json: updatedStatus
  end


  private




end
