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
