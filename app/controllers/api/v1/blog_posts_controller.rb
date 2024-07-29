class Api::V1::BlogPostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @blog_posts = BlogPost.all.order(created_at: :desc)
    @technologies = Technology.all
    render json: @blog_posts.as_json(include: [:user, :technologies], methods: :photo_url)
  end

  def show
    @blog_post = BlogPost.find(params[:id])
    @technologies = @blog_post.technologies
    @user = @blog_post.user
    render json: @blog_post.as_json(include: [:user, :technologies], methods: :photo_url)
  end

  def new
    @blog_post = BlogPost.new
  end

  def create
    image_content = params[:blog_post][:content].find { |hash| hash[:type] == "image" }
    image_url = image_content ? image_content[:content] : nil

    @blog_post = BlogPost.new(blog_post_params)
    @blog_post.user = current_user

    if @blog_post.save
      @blog_post.upload_photo(image_url) if image_url.present?
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
    params.require(:blog_post).permit(:title, content: [:type, :content], photo_url: [], technology_ids: [])
  end
end
