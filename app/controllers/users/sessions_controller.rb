# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
 # before_action :configure_sign_in_params, only: [:create]
  respond_to :json

  def create
    user = User.find_by(email: sign_in_params[:email])

    if user && user.valid_password?(sign_in_params[:password])
      token = user.generate_jwt
      response.headers['Authorization'] = "Bearer #{token}"
      render json: { message: 'Logged in successfully sessions#create', user: user }, status: :ok
      @current_user = user
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end\

  private

 # def respond_with(resource, _opts = {})
 #   render json: { message: 'Logged in sucessfully sessions#repondwith.', data: resource }, status: :ok
 # end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  #If you have extra params to permit, append them to the sanitizer.
  #def configure_sign_in_params
  #  devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  #end
end
