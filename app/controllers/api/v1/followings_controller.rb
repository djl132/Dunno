class Api::V1::FollowingsController < ApplicationController
  # must be signed in to create comment
 before_action :authenticate_user!

 def index
    render json: Following.all
 end

 def create
   # look over mass assignment
   question = Question.find(params[:question_id])
   following = current_user.followings.new(following_question: question)

     if following.save
       flash[:notice] = "Following this question."
      render json: following # re render user page
     else
       flash[:alert] = "Failed to follow this question."
      #  redirect_to :back # re render user page
     end
 end

 def destroy
   # why not juse use the COMMENT id??????
   question = Question.find(params[:question_id])
   following = question.followings.where(id: params[:id]).first
    puts following || "DNE"

   if following.destroy
      following.save
     flash[:notice] = "You unfollowed this question."
    #  redirect_to :back
   else
     flash[:alert] = "Failed to unfollow this question."
    #  redirect_to :back
   end
 end

end
