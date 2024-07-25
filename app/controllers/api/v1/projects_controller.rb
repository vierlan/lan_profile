class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @projects = Project.all.order(created_at: :desc)
    @technologies = Technology.all
    @project_technologies = project.technologies
    @user = project.user
    render json: @projects, include: [:user, :technologies]
  end

  def show
    @project = Project.find(params[:id])
    @technologies = project.technologies
    @user = project.user
    render json: @project, include: [:user, :technologies]
  end

  def new
    @project = Project.new
  end

  def create

    @project = Project.new(project_params)
    @project.user = current_user
    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    head :no_content
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :content )
  end

end
