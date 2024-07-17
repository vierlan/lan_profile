class Api::V1::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def show
    @current_user = current_user
    render json: { email: current_user.email, username: current_user.username }
  end
end
