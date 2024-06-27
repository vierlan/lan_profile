class Api::V1::BlogPostsController < ApplicationController
  def index
    @blog_posts = BlogPost.all.order(created_at: :desc)
    render json: @blog_posts
  end

  def show
    @blog_post = BlogPost.find(params[:id])
  end

  def new
    @blog_post = BlogPost.new
  end

  def create
    @blog_post = BlogPost.new(blog_post_params)
    @blog_post.author = current_user

    if @blog_post.save
      redirect_to @blog_post
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @blog_post = BlogPost.find(params[:id])
    @blog_post.destroy

    redirect_to blog_posts_path
  end

  private

  def blog_post_params
    params.require(:blog_post).permit(:title, :content, :author)
  end

end
