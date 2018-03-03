  class Api::V1::QuestionsController < ApiController

    # MUST be signed in as an admin in order to CREATE, UPDATE, NEW, EDIT
    # before_action :require_sign_in, except: [:index, :show]
    before_action :authenticate_user!

    def index
        configured_questions = Question.includes(followings: :following_user, answers: :user, group: [:banned_users, :admins, memberships: [:user]]).paginate(page: 1, per_page: 10).where('expires_on > ?', Time.now).order('last_active DESC')
        render json: configured_questions,
            adapter: :json,
            each_serializer: HomeQuestionsSerializer,
            meta: {isLastPage: isLastPage(configured_questions)}
    end

    def root_search
      if index_search = params[:index_search]
        puts "INDEXSERACH:#{index_search}"
        render json: Question.where('title ILIKE ?', "#{index_search}").includes(:user), serializer: QuestionWithUserSerializer
      end
    end


    def search_in_group
      if ((id = params[:group_id]) && (group_search = params[:search]))
        puts id
        puts group_search
        render json: Question.includes(:user).where('group_id = ? AND title ILIKE ?', id.to_i, "%#{group_search}%"), serializer: QuestionWithUserSerializer
      end
    end

    # Question.where('group_id = ?', Group.first.id).where( 'title LIKE ? AND body LIKE ?', "%y%","%y%" )

    def create
        # MERGE INFORMATION INTO PARAMS FOR MASS-ASSIGNMENT\
        group = Group.find_by(name: params[:topic])

        puts "GROUP THAT THE QUESTION BELONGS TO:#{group.inspect}"
        question = Question.new(question_params.merge(user_id: current_user.id, group: group, last_active: Time.now, expires_on: Time.now + 1.days))

        # EXECUTIES VALIDATION, AND THEN GETS ERRORS ATTRIBUE IF IT' S VALIDATE.  CREATE DES THAT ALSO.
        if question.valid?
          # check if user is banned from group
          authorize question
          question.save
          render json: Question.includes(:user).find(question.id), serializer: QuestionWithUserSerializer
        else
          render json:{
            success: false,
            errors: render_errors(question.errors),
          }, status: 422
        end
        # question.group_id = Group.find_by(name: params[:question][:topic]).id
    end


    def destroy
      # why not juse use the COMMENT id??????
      question = Question.find(params[:id])

      authorize question
      if question.destroy
         question.save
         puts "deleted this question:", question.inspect

         flash[:notice] = "Successfully created question."
       #  redirect_to :back
      else
        flash[:alert] = "Failed to create question."
       #  redirect_to :back
      end
    end

# UPDATE ATTRIBUES TREATES
# hypothesis, UDPATEATTRIBUTES CARES ABOUT WEHTHER OR NOT EACH VALUE IS UPDATED.
    def update
      # puts params.inspect
      # puts question_params.inspect
      question = Question.find(params[:id])
      authorize question
      group = Group.find_by(name: params[:group_name])
      # update, if pass, returning true
      # nto valid, pass false, that's ti.
      if question.update_attributes(question_params.merge(group: group, last_active: Time.now))
        puts question.inspect
        render json: Question.includes(followings: :following_user, group: [:banned_users, :admins, memberships: [:user]]).find(params[:id]), serializer: HomeQuestionsSerializer, root: nil
      else
        render json:{
          success: false,
          errors: render_errors(question.errors),
        }, status: 422
      end
    end

     def show
       render json: Answer.includes(:user).where('question_id = ?', params[:id]), each_serializer: AnswerSerializer
      #  render json: Question.includes(:user, followings: :following_user, group: [:banned_users, :adminships, memberships: [:user]]).find(params[:id]) , serializer: HomeQuestionsSerializer
     end

# creates another hash that is strong PARAMETERIZED, FILTERED for MASS ASSIGNMENT.
     private
     def question_params
        params.require(:question).permit(:title, :body)
     end

# group has it's own validation message, don't check for user errors.
     def render_errors(errors_for_object)
       result = []
         errors_for_object.messages.each {|key, errors_for_attr|
               errors_for_attr.each {|error|
                 key_value = (key.to_s == "group" || key.to_s == "user") ? nil : (key.to_s + " ").capitalize
                 result << "#{key_value}#{error}"


             }
       }
      puts result
       result
     end
  end

#
#  def index
#    if params[:tag]
#      @questions = Question.tagged_with(params[:tag]).order("created_at DESC")
#    elsif params[:search]
#      @questions = Question.search_for(params[:search]).order("created_at DESC")
#    else
#     @questions = Question.all.order("created_at DESC")
#    end
#  end
#
#
#   def new
#       @question = Question.new
#   end
#
#
#   def create
#     @question = Question.new(question_params)
#     @question.user = current_user
#
#     if @question.save
#       redirect_to @question, notice: "question was saved successfully."
#     else
#       flash.now[:alert] = "Error. Try again."
#       render :new
#     end
#
#   end
#
#
#   def edit
#       @question = Question.find(params[:id])
#       authorize_edit(@question)
#   end
#
#   def update
#
#     @question = Question.find(params[:id])
#     authorize_edit(@question)
#
#     @question.assign_attributes(question_params)
#
#     if @question.save
#        flash[:notice] = "Question was updated."
#       redirect_to @question
#     else
#       flash.now[:alert] = "Error updating question. Please try again."
#       render :edit
#     end
#
#   end
#
#   def destroy
#     @question = Question.find(params[:id])
#     authorize_edit(@question)
#
#     if @question.destroy
#       flash[:notice] = "Question was successfully deleted."
#       redirect_to action: :index
#     else
#       flash.now[:alert] = "There was an error deleting the question."
#       render :show
#     end
#   end
#
#
#   def show
#     @question = Question.find(params[:id])
#   end
#
#
#   # def threads
#   #   @threads = current_user.threads
#   # end
#
#
#
#   private
#
# # what information can requrests pass into our question objects
#    def question_params
#      params.require(:question).permit(:title,:body,:all_tags,:file,:image)
#    end
#
#     # def authorize_user
#     #   unless current_user.admin?
#     #     flash[:alert] = "You must be an admin to do that."
#     #     redirect_to questions_path
#     #   end
#     # end
#
#     def authorize_edit(question)
#         unless current_user == question.user || current_user.admin?
#           flash[:alert] = "You must own the question."
#           redirect_to questions_path
#         end
#     end
#
#
# end
