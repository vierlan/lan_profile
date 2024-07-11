class Api::V1::BlogPostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def index
    @blog_posts = BlogPost.all.order(created_at: :desc)
    render json: @blog_posts

  end

  def show
    @blog_post = BlogPost.find(params[:id])
    render json: @blog_post
  end

  def new
   # if user_signed_in?
   #   puts "User is signed in as #{current_user.email}"
      @blog_post = BlogPost.new
   # else
   #   render json: { error: 'You need to sign in or sign up before continuing.' }, status: :unauthorized
   #   redirect_to new_user_session_path
   # end
  end

  def create
    @blog_post = current_user.blog_posts.new(blog_post_params)
    @blog_post.user_id = current_user.id
    #rescue_from JWT::DecodeError, with: :handle_unauthorized
    if @blog_post.save
      render json: @blog_post, status: :created
    else
      Rails.logger.debug(@blog_post.errors.full_messages) # Log errors to help debug
      render json: @blog_post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @blog_post = BlogPost.find(params[:id])
    @blog_post.destroy

    head :no_content
  end

  private

 def blog_post_params
  params.require(:blog_post).permit(:title, content: [:body, :subheader])

  end

  def handle_unauthorized
    render json: { error: 'Unauthorized from blog post controller' }, status: :unauthorized
  end
end
