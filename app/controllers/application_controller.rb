  require 'application_responder'
require 'pry-remote'
  class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception

    include Pundit

    # allow devise controller WHITELIST params
    before_action :configure_permitted_parameters, if: :devise_controller?

    respond_to :json, :html

  # THIS WILL HANDLE INITIAL ROOT, AS WELL AS ANY FE ROUTES.
    def angular
      render 'layouts/application'
    end


  # ADD ADDITIONAL PARAMETERS ON TOP OF THE EXISTING DEVISE PERMITTED PARAMS, (EMIAL, PASSWORD, AND STUFF)
    def configure_permitted_parameters
    #  devise_parameter_sanitizer.for(:sign_in)        << :username
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    #  devise_parameter_sanitizer.for(:account_update) << :username
    end

  end
