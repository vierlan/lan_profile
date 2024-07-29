require 'open-uri'

class BlogPost < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  has_many :blog_post_technologies
  has_many :technologies, through: :blog_post_technologies

  validates :title, presence: true, length: { minimum: 3 }
  validates :content, presence: true

  #uses rails active staorage blob url to get the url of the attached photo

  #def photo_url
  #  Rails.application.routes.url_helpers.rails_blob_url(photo, only_path: true) if photo.attached?
  #end

  #  uses cloudinary to get the url of the attached photo

  def upload_photo(image)
      upload_result = Cloudinary::Uploader.upload(image)
      #self.photo.attach(io: open(upload_result['secure_url']), filename: "#{self.title}-photo")
      self.update(photo_url: upload_result['secure_url'])
  end



end
