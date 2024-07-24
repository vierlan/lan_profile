class BlogPost < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  has_many :blog_post_technologies
  has_many :technologies, through: :blog_post_technologies

  validates :title, presence: true, length: { minimum: 3 }
  validates :content, presence: true

end
