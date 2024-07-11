class Api::V1::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def show
    # get @current_user from application controller
    

    current_user = User.find_by(email: params[:email])
    render json: UserSerializer.new(current_user).serializable_hash[:data], status: :ok
    render json: { email: current_user.email, username: current_user.username }
  end

  private

  def handle_unauthorized
    render json: { error: 'Unauthorized from current user controller' }, status: :unauthorized
  end
end
