class BlogPostTechnology < ApplicationRecord
  belongs_to :blog_post
  belongs_to :technology
end
