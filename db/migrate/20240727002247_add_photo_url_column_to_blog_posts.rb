class AddPhotoUrlColumnToBlogPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :blog_posts, :photo_url, :string
  end
end
