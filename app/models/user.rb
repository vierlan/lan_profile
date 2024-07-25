# app/models/user.rb

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self



  def upload_avatar(image)
   upload_result = Cloudinary::Uploader.upload(image)
   self.update(avatar_url: upload_result['secure_url'])
  end

  def generate_jwt
    JWT.encode({
      sub: id.to_i,
       iat: Time.now.to_i,
       exp: 24.hours.from_now.to_i
        }, Rails.application.credentials.devise_jwt_secret_key!)
  end

end
