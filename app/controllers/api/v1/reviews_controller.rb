class Api::V1::ReviewsController < ApiController

# must be signed in to create comment
before_action :authenticate_user!

# if want to destory, must be authorized
# before_action :authorize_user, only: [:destroy]


def index
    user = User.find(params[:user_id])
    render json: user.reviews_by_others

end

def create
  # look over mass assignment
  review = Review.new(review_params)
  review.reviewed = User.find(params[:user_id])
  review.reviewer = current_user
  authorize review

    if review.save
      flash[:notice] = "Review submitted successfully."
      render json: review
    else
      flash[:alert] = "Review failed to save."
      render json: 500
    end
end

def destroy

  # why not juse use the COMMENT id??????
  review = Review.find(params[:id])

  authorize review

  if review.destroy
    flash[:notice] = "Review was deleted."
  else
    render json: review
  end
end


def update
  review = Review.find(params[:id])
  authorize review
  review.update_attributes(review_params)
  render json: review
end


private
    def review_params
      params.require(:review).permit(:content, :friendliness, :accuracy, :clarity)
    end

# authoize Destroy comment
    # def authorize_user
    #   review = Review.find(params[:id])
    #   unless current_user == review.reviewer || current_user.admin?
    #     flash[:alert] = "You do not have permission to delete the review."
    #     redirect_to review.reviewed
    #   end
    # end


end
