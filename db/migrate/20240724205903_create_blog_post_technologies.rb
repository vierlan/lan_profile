class CreateBlogPostTechnologies < ActiveRecord::Migration[7.1]
  def change
    create_table :blog_post_technologies do |t|
      t.references :blog_post, null: false, foreign_key: true
      t.references :technology, null: false, foreign_key: true

      t.timestamps
    end
  end
end
