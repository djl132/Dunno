class Api::V1::CommentsController < ApiController
# must be signed in to create comment
# before_action :require_sign_in
#
# # if want to destory, must be authorized
before_action :authenticate_user!, only: [:create]

# def index
#   nested_comments = Answer.find(params[:answer_id]).nested_comments
#   render json: nested_comments
# end

def create
  # if ROOT commetn - phas answer
   if params[:answer_id].to_i != -1
     answer = Answer.find(params[:answer_id])
     puts "THSI IS THE PARENT _ID : #{params[:parent_id]}"
     comment = answer.comments.create(comment_params.merge(user: current_user, parent_id: params[:parent_id]))
     comment.answer.question.update_attributes(last_active: Time.now, expires_on: Time.now + 5.hour)
  # if NESTED commetn - phas answer
   else
     comment = Comment.create(comment_params.merge(user: current_user, parent_id: params[:parent_id]))
     comment.parent.answer.question.update_attributes(last_active: Time.now, expires_on: Time.now + 5.hour)
   end
   pp "COMMENT CREATED:#{comment.inspect}"
   pp "COMMENT CREATED:#{comment.user.inspect}"

   render json: comment, include: :user
end

def show_comments
   render json: Comment.includes(:user).where('answer_id = ?', params[:id]), each_serializer: CommentSerializer
end

def show_children_comments
 render json: Comment.includes(:user).where('parent_id = ? AND parent_id IS NOT NULL', params[:id  ]), each_serializer: ReplySerializer
end


# Group: arrange questions based on when they were last active.
# following_questions : same as group.
#
# expires_in --> mometnjs time
#
# udpate:
# 1. 1hr - when commented
# 2. 2hr - for each com

def destroy
  c = Comment.find(params[:id])
  authorize c
  # first destroy children, then destroy the comment
  if c.destroy_children
    c.destroy
    render json: {
      info: "deleted comment successfully!"
    }, status: 200
  else
  end
end

def update
  c = Comment.find(params[:id])
  authorize c
  if c.update_attributes!(comment_params)
    # if child comment
    if c.parent
    c.parent.answer.question.update_attributes(last_active: Time.now, expires_on: Time.now + 5.hour)
    else
    c.answer.question.update_attributes(last_active: Time.now, expires_on: Time.now + 5.hour)
    end
    render json: c
  else
    render json: {
      error: "invalid data for comment"
    }, status: 422
  end
end

 # def upvote
 #   answer = Answer.find(params[:post_id])
 #   comment = answer.comments.find(params[:id])
 #   comment.increment!(:upvotes)
 #
 #   respond_with :api, :v1, answer, comment
 # end
 #
 # def downvote
 #   answer = Answer.find(params[:post_id])
 #   comment = answer.comments.find(params[:id])
 #   comment.increment!(:downvotes)
 #
 #   respond_with :api, :v1, answer, comment
 # end

 private
   def comment_params
     params.require(:comment).permit(:body)
   end

end
