class PagesController < ApplicationController
  def home
    if user_signed_in?
      @user.user
  end
end
