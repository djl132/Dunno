class Api::V1::UsersController < ApiController
  before_action :authenticate_user!

  def index
    render json: User.all
  end

  def show
    user = User.find(params[:id])
    puts "THE USER SHOWN: #{user.inspect}"
    render json: user, serializer: ProfileSerializer
  end

  def update
    user = User.find(params[:id])
    authorize user
    if user.update_attributes(user_params)
      puts "USER: #{user.inspect}"
      render json: user
    else
      render json:{
        success: false,
        errors: render_errors(user.errors),
      }, status: 422
    end
  end

  def search_user
    render json: User.where('username ILIKE ?',"%#{params[:username]}%"), serializer: UserWithUsernameIdSerializer
  end

# resource.error -> array of hashes (with aa attribute as key => [ array(of erros for the attribute)])
  def render_errors(errors_for_object)
    result = []
      errors_for_object.messages.each {|prop, errors_for_attr|
            errors_for_attr.each {|error|
              result << "#{prop.capitalize} #{error}"
          }
    }
   puts result
    result
  end

  private

  def user_params

    params.require(:user).permit(:major, :bio, :classes, :username, :avatar)

  end

end
