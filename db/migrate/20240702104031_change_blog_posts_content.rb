class ChangeBlogPostsContent < ActiveRecord::Migration[7.1]
  def change
    remove_column :blog_posts, :content
    add_column :blog_posts, :content, :jsonb
  end
end
