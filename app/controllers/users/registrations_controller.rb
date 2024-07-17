# frozen_string_literal: true
class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super do |user|
      if user.persisted?
        user.upload_avatar(params[:user][:avatar_url]) if params[:user][:avatar_url].present?
        @token = user.generate_jwt
        response.headers['Authorization'] = "Bearer #{@token}"
      end
    end
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: 'Signed up successfully registration#respondwith', user: resource, token: @token }, status: :ok
    else
      render json: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }, status: :unprocessable_entity
    end
  end
end














#class Users::RegistrationsController < Devise::RegistrationsController
#  respond_to :json
#
#def create
#  super do |user|
#    user.upload_avatar(params[:user][:avatar_url]) if params[:user][:avatar_url].present?
#  end
#  token = user.generate_jwt
#  response.headers['Authorization'] = "Bearer #{token}"
#  render json: { message: 'Logged in successfully registrations#create', user: user }, status: :ok
#  @current_user = user
#end
#def update
#  super do |user|
#    if params[:user][:avatar].present?
#      user.upload_avatar(params[:user][:avatar])
#    end
#  end
#end
#  private

# def respond_with(resource, _opts = {})
#   if request.method == "POST" && resource.persisted?
#     render json: { message: "Signed up sucessfully registrations#respondwith.", data: resource }, status: :ok
#   elsif request.method == "DELETE"
#     render json: {
#       status: { code: 200, message: "Account deleted successfully."}
#     }, status: :ok
#   else
#     render json: {
#       status: {code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}"}
#     }, status: :unprocessable_entity
#   end
# end

# protected
#
## def after_sign_up_path_for(resource)
##   api_v1_current_user_path(@user) # Adjust this to your profile path
## end
#
#nd



  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
