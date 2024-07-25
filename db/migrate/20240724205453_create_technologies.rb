class CreateTechnologies < ActiveRecord::Migration[7.1]
  def change
    create_table :technologies do |t|
      t.string :language
      t.string :operating_system
      t.string :database
      t.string :frameworks
      t.string :monitoring
      t.string :servers

      t.timestamps
    end
  end
end
