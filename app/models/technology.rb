class Technology < ApplicationRecord
  has_many :project_technologies
  has_many :projects, through: :project_technologies
  has_many :blog_post_technologies
  has_many :blog_posts, through: :blog_post_technologies
end
