class Project < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  has_many :project_technologies
  has_many :technologies, through: :project_technologies


  validates :name, presence: true, length: { minimum: 3 }
  #validates :description, presence: true
  #validates :content, presence: true
end
