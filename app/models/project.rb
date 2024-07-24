class Project < ApplicationRecord
  has_many :technologies, through: project_technologies
  belongs_to :user
  has_one_attached :photo
  

  validates :name, presence: true, length: { minimum: 3 }
  validates :description, presence: true
  validates :content, presence: true
end
