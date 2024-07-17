class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
#
  protected
#
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :avatar_url])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[ username email password current_password avatar_url])
  end

  #def authenticate_user!
  #  token = request.headers['Authorization']
  #  raise JWT::DecodeError unless token
#
  #  jwt_payload = JWT.decode(token.split(' ').last, Rails.application.secret_key_base).first
  #  @current_user = User.find(jwt_payload['sub'])
  #rescue JWT::DecodeError
  #  render json: { error: 'Unauthorized from application conroller' }, status: :unauthorized
  #end
  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    return render json: { error: 'Token missing' }, status: :unauthorized unless token

    begin
      payload = JWT.decode(token, Rails.application.secret_key_base).first
      @current_user = User.find(payload['sub'])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: { error: 'Invalid token from application controller' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
