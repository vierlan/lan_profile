class BlogPost < ApplicationRecord
  belongs_to :user
  has_one_attached :photo

  validates :title, presence: true, length: { minimum: 3 }
  validates :content, presence: true

end
