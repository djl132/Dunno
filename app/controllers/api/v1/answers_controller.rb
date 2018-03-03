class Api::V1::AnswersController < ApiController
  before_action :authenticate_user!

  def create
    q = Question.find(params[:question_id])
    answer = q.answers.new(answer_params.merge(user_id: current_user.id))
    authorize answer
    if answer.valid?
      answer.save
      answer.question.update_attributes(last_active: Time.now, expires_on: q.expires_on + 7.hour)
      answer.initialize_rank
      puts "RANK OF NEW ANSWER: #{answer.rank}"
      render json: answer, serializer: AnswerSerializer
    else
      render json:  {
        success: false,
        errors: render_errors(answer.errors)
      }, status: 422
    end
  end

  def show
    render json: Comment.includes(:user).where('answer_id = ?', params[:id]), each_serializer: CommentSerializer
  end

  # def update
  #   puts params.inspect
  #   puts question_params.inspect
  #   question = Question.find(params[:id])
  #   group = Group.find_by(name: params[:topic])
  #   question.update_attributes!(question_params.merge(group: group))
  #   puts question.inspect
  #   respond_with :api, :v1, question
  # end
  #
  def update
    question = Question.find(params[:question_id])
    answer = question.answers.find(params[:id])
    authorize answer

    if answer.update_attributes(answer_params.merge(user: current_user))
        question.update_attributes(last_active: Time.now, expires_on: question.expires_on + 7.hour)
        render json: answer
    else
      render json:  {
        success: false,
        errors: render_errors(answer.errors)
      }, status: 422
    end

  end

  def destroy
    # q = Question.find(params[:question_id])
    answer = Answer.find(params[:id])
    authorize answer

    if answer.destroy
      puts "RANK OF DESTROYED ANSWER: #{answer.rank}"
      # respond_with :api, :v1, q, answer
    else
    end
  end
  private

     # ALLOW CONTROLLERS TO USE  PARAMS TO MASS ASSIGN A RESOURCE
     # RETURNS ATTRIBUTES OF AN OBJECT PARAMS
       def answer_params

         # WHAT DOES PARAMS.REQUIRE DO?
         params.require(:answer).permit(:body)
       end

      #  def render_errors(errors_for_object)
      #    result = []
      #      errors_for_object.messages.each {|key, errors_for_attr|
      #            errors_for_attr.each {|error|
      #              result << "#{key.capitalize} #{error}"
      #          }
      #    }
      #   puts result
      #    result
      #  end

end
 # require sign in to CRU answers excapt for show
# before_action :require_sign_in, except: :show
#
# before_action :authorize_user, except: [:show, :new, :create]
#

# # DISPLAYS VIEW FOR answer AND TAKES IN answer DATA USING FORM_FOR, PASSING DATA TO CREATE
#   def new
#     @question = Question.find(params[:question_id])
#     @answer = Answer.new
#   end
#
# # CREATES AND SAVES NEW POST TO DB, REDIRECTING TO NEWLY CREATED POST AFTER
# # TAKES IN: create new post
#
# # PARAMS IS TAKING IN THE ID OF question, FROM THE FORM_FOR? OR THE URL?
#   def create
#     @question = Question.find(params[:question_id])
#
#     # creates(BUILDS) post in a question with the ALLOWED attributes and associated user
#
#     # wiat I thought this should already save, hmmm......shouldn't this error out?
#     @answer = @question.answers.build(answer_params)
#     # @answer = @question.answers.new(answer_params)
#     @answer.user = current_user
#
#     puts @question.tags
#     puts @answer.tags
#
# #update data, handle errors
#     if @answer.save
#       # save a notice for DISPLAYING IN APPLCAITON LAYOUT.
#       flash[:notice] = "Answer was created."
#
#       # THIS JUST CALLS THE GET REQUEST PASSING IN THE ID OF THE asnwer BY DEFAIULT IRHGT?
#       redirect_to @question # HERE PARAMS IS STORING answer DATA
#     else
#       flash.now[:alert] = "There was an error saving the answer. Please try again."
#       render :new
#     end
#   end
#
#   def edit
#     @answer = Answer.find(params[:id])
#   end
#
#   def show
#     @answer = Answer.find(params[:id])
#   end
#
#
#    def destroy
#      @answer = Answer.find(params[:id])
#
#  # #8
#      if @answer.destroy
#        flash[:notice] = "\"#{@answer.content}\" was deleted successfully."
#        redirect_to @answer.question
#      else
#        flash.now[:alert] = "There was an error deleting the answer."
#        render :show
#      end
#    end
#
#  # WOULD  IT BE FINE IF UPDATE DIDN'T USE PARENT question INFORMATION? in it's route? shallow?
#    def update
#       @answer = Answer.find(params[:id]) #is thsi query url paramertes from edit?
# # UPDATE ATTRIBUTES
#       @answer.assign_attributes(answer_params)
#
#       if @answer.save
#         flash[:notice] = "answer updated."
#         redirect_to [@answer.question, @answer]
#       else
#         flash.now[:alert] = "Error updating. Try again."
#         render :edit
#       end
#    end




# # ActiveRecord CALLBACKS CAN TAKE IN PARAMS TOO!!!
#     def authorize_user
#          answer = Answer.find(params[:id])
#      # #11
#          unless current_user == answer.user || current_user.admin?
#            flash[:alert] = "You must be an admin to do that."
#            redirect_to [answer.question, answer]
#          end
#     end
#
