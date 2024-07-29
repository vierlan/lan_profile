# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
2.times do

 User.create(
    email: Faker::Internet.email,
    password: "password",
    username: Faker::Internet.username
  )
end


BlogPostTechnology.destroy_all
ProjectTechnology.destroy_all
BlogPost.destroy_all
Technology.destroy_all
Project.destroy_all




images = [
  "client lan_profile/src/assets/images/1.jpg",
  "client lan_profile/src/assets/images/2.jpg",
  "client lan_profile/src/assets/images/3.jpg",
  "client lan_profile/src/assets/images/4.jpg",
  "client lan_profile/src/assets/images/5.jpg",
  "client lan_profile/src/assets/images/6.jpg",
  "client lan_profile/src/assets/images/7.jpg",
  "client lan_profile/src/assets/images/8.jpg",
  "client lan_profile/src/assets/images/9.jpg"
]


# Create BlogPost records


posts = [
  {
    title: "Getting Started with Python: A Beginner's Guide",
    content: [
      { "type": "subheader", content: "Choosing the Right Programming Language" },
      { "type": "body", content: "Python is an excellent language for beginners due to its simplicity and versatility. Whether you're interested in web development, data analysis, or automation, Python has you covered. In this guide, we'll cover the basics of Python syntax, variables, loops, and functions. By the end, you'll have a solid foundation to start building your own projects." }
    ]
  },
  {
    title: "Building a RESTful API with Node.js and Express",
    content: [
      { "type": "subheader", content: "Creating a RESTful API" },
      { "type": "body", content: "Node.js and Express are a powerful combination for building web applications. In this tutorial, we'll walk through the process of creating a RESTful API with Node.js and Express. We'll cover topics such as routing, middleware, error handling, and testing. By the end, you'll have a fully functional API that you can use to power your own applications." }
    ]
  },
  {
    title: "Introduction to React: Building Your First Application",
    content: [
      { "type": "subheader", content: "Getting Started with React" },
      { "type": "body", content: "React is a popular JavaScript library for building user interfaces. In this tutorial, we'll walk through the process of creating your first React application. We'll cover topics such as components, props, state, and hooks. By the end, you'll have a working application that you can use as a starting point for your own projects." }
    ]
  },
  {
    title: "Mastering Git: A Comprehensive Guide to Version Control",
    content: [
      { "type": "subheader", content: "Understanding Version Control" },
      { "type": "body", content: "Git is a powerful tool for managing your codebase and collaborating with others. In this guide, we'll cover the basics of Git, such as repositories, branches, commits, and merges. We'll also explore more advanced topics, such as rebasing, cherry-picking, and resolving conflicts. By the end, you'll have a solid understanding of Git and how to use it effectively in your projects." }
    ]
  },
  {
    title: "Getting Started with Docker: A Beginner's Guide",
    content: [
      { "type": "subheader", content: "Introduction to Docker" },
      { "type": "body", content: "Docker is a powerful tool for containerizing your applications and running them in a consistent environment. In this guide, we'll cover the basics of Docker, such as containers, images, volumes, and networks. We'll also explore more advanced topics, such as Docker Compose, Docker Swarm, and Kubernetes. By the end, you'll have a solid foundation to start using Docker in your own projects." }
    ]
  },
  {
    title: "Automating Your Workflow with Jenkins: A Step-by-Step Guide",
    content: [
      { "type": "subheader", content: "Introduction to Jenkins" },
      { "type": "body", content: "Jenkins is a powerful tool for automating your development workflow and ensuring the quality of your codebase. In this guide, we'll walk through the process of setting up Jenkins, creating jobs, and configuring pipelines. We'll also explore more advanced topics, such as plugins, credentials, and distributed builds. By the end, you'll have a fully functional Jenkins server that you can use to streamline your development process." }
    ]
  }
]

posts.each do |post|
  blog = BlogPost.new(
    title: post[:title],
    category: "Programming",
    user_id: User.pluck(:id).sample,
    content: post[:content]  # Directly assign the content hash
  )
  blog.content << { "type" => "image", "content" => images.sample }
  image_content = blog.content.find { |c| c["type"] == "image" }
  image_url = image_content ? image_content["content"] : nil
  blog.upload_photo(image_url) if image_url.present?

  puts "BlogPost: #{blog.title} - #{blog.photo_url}"
  blog.save!
end

puts "BlogPosts Seeded Successfully!"

# Create Technology records
puts "Seeding Technologies..."

technologies = {
  languages: ["Python", "JavaScript", "Java", "Ruby", "C++", "C#", "PHP", "Swift", "Kotlin", "TypeScript"],
  frameworks: ["React", "Angular", "Vue.js", "Django", "Ruby on Rails", "Spring Boot", "Laravel", "Express.js", "Flask", "ASP.NET"],
  databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "Oracle", "SQL Server", "Firebase", "Cassandra", "DynamoDB"],
  monitoring: ["Git", "Docker", "Jenkins", "Kubernetes", "VS Code", "IntelliJ IDEA", "Eclipse", "Postman", "Jira", "Slack"]
}
technologies.each do |category, tech_list|
  tech_list.each do |name|
    case category
    when :languages
      Technology.find_or_create_by!(language: name)
    when :frameworks
      Technology.find_or_create_by!(frameworks: name)
    when :databases
      Technology.find_or_create_by!(database: name)
    when :monitoring
      Technology.find_or_create_by!(monitoring: name)
    end
  end
end

puts "Technologies Seeded Successfully!"

# Create Project records
puts "Seeding Projects..."

projects = [
  { name: "Portfolio Website", description: "Personal portfolio showcasing projects and skills", content: "This was my personal portfoli project.", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Blog Platform", description: "Web application for publishing articles and posts", content: "This is just some text to quickly fill in the parts that I'm not going to write at the moment.", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "E-Commerce Platform", description: "Online marketplace for buying and selling products", content: "This is just some text to quickly fill in the parts that I'm not going to write at the moment.", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Task Management App", description: "Web application for managing tasks and projects", content: "This is just some text to quickly fill in the parts that I'm not going to write at the moment.", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Social Networking Site", description: "Connect with friends and share updates online", content: "This is just some text to quickly fill in the parts that I'm not going to write at the moment.", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Recipe Sharing Platform", description: "Discover and share recipes with a community of food enthusiasts", content: "This is just some text to quickly fill in the parts that I'm not going to write at the moment.", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) }
]

projects.each do |project|
  project = Project.new(
    name: project[:name],
    description: project[:description],
    user_id: project[:user_id],
    technology_ids: project[:technology_ids]
  )
  image_url = images.sample
  image_file = URI.open(image_url)
  project.photo.attach(io: image_file, filename: 'project_image.jpg')

  project.save!

  # Get the URL of the attached photo
  photo_url = project.photo.url
   puts "project: #{project.name} - #{image_url}"

  # Use the photo_url in your API response or further processing
  # For example, you can return it as JSON

end

puts "Projects Seeded Successfully!"
puts "Data Seeded Successfully!"
