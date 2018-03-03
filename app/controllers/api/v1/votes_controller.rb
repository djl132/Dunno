class Api::V1::VotesController < ApiController

before_action :authenticate_user!

  def up_vote
    @answer = Answer.find(params[:answer_id])
    @vote = @answer.votes.where(user_id: current_user.id).first
    if !@vote
      @vote = current_user.votes.create(value: 1, answer: @answer)
    elsif @vote.value == 1
      @vote.destroy
    else
      @vote.update_attribute(:value, 1)
    end

# send to page taht triggered the action
    @vote.update_answer
    respond_with :api, :v1, @answer.question, @answer
  end

  def down_vote
     @answer = Answer.find(params[:answer_id])
     @vote = @answer.votes.where(user_id: current_user.id).first

     if !@vote
       @vote = current_user.votes.create(value: -1, answer: @answer)
# HOW IS THIS SAVED? UDPATE_ASNWER ACTUALLY SAVES THE VOTE?
       puts "AFTER DOWNVOTE: #{@vote.answer.inspect}"
       puts "NEW ANSWER: #{@vote.answer.inspect}"
     elsif @vote.value == -1
       @vote.destroy
     else
       @vote.update_attribute(:value, -1)
     end

     @vote.update_answer
     render json: @vote.answer
   end



   private
  #  def update_vote(new_value)
  #    @post = Post.find(params[:post_id])
  #    @vote = @post.votes.where(user_id: current_user.id).first
   #
  #    if @vote
  #      @vote.update_attribute(:value, new_value)
  #    else
  #      @vote = current_user.votes.create(value: new_value, post: @post)
  #    end
  #  end
end
