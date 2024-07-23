class Api::V1::BlogPostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @blog_posts = BlogPost.all.order(created_at: :desc)
    render json: @blog_posts
  end

  def show
    @blog_post = BlogPost.find(params[:id])
    render json: @blog_post
  end

  def new
    @blog_post = BlogPost.new
  end

  def create

    @blog_post = BlogPost.new(blog_post_params)
    @blog_post.user = current_user
    binding.pry
    if @blog_post.save
      render json: @blog_post, status: :created
    else
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
    params.require(:blog_post).permit(:title, content: [:type, :content], )
  end

end
