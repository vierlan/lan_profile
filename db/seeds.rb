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
  "https://unsplash.com/photos/woman-sitting-in-front-of-desk-with-computer-monitor-and-keyboard-on-top-eAXpbb4vzKU",
  "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-white-table-N825pMIaG-0",
  "https://unsplash.com/photos/a-bunch-of-wires-that-are-connected-to-each-other-E9L3dr2Dcmk",
  "https://unsplash.com/photos/a-close-up-of-a-laptop-computer-with-a-micro-board-attached-to-it-GsiX1c51hGs",
  "https://unsplash.com/photos/turned-on-gray-laptop-computer-XJXWbfSo2f0",
  "https://unsplash.com/photos/turned-on-monitor-displaying-programming-language-u2Ru4QBXA5Q",
  "https://unsplash.com/photos/macbook-pro-on-black-wooden-table-PNbDkQ2DDgM"
]


# Create BlogPost records

posts = [
  {
    title: "Getting Started with Python: A Beginner's Guide",
    content: {
      subheader: "Choosing the Right Programming Language",
      body: "Python is an excellent language for beginners due to its simplicity and versatility. Whether you're interested in web development, data analysis, or automation, Python has you covered. In this guide, we'll cover the basics of Python syntax, variables, loops, and functions. By the end, you'll have a solid foundation to start building your own projects."
    }
  },
  {
    title: "Mastering JavaScript Fundamentals",
    content: {
      subheader: "Understanding Variables and Data Types",
      body: "JavaScript is the backbone of web development, powering interactivity and user experience on the web. This guide dives into the fundamental concepts of JavaScript, including variables, data types, and operators. You'll learn how to manipulate data, control program flow with conditional statements, and create functions to encapsulate reusable code."
    }
  },
  {
    title: "HTML and CSS Essentials for Web Developers",
    content: {
      subheader: "Building Responsive Websites",
      body: "HTML and CSS are the building blocks of the web. In this essential guide, we explore HTML tags and attributes for structuring content and CSS properties for styling. You'll learn how to create responsive layouts, enhance user interfaces with animations, and optimize your code for performance. Whether you're new to web development or brushing up on your skills, mastering HTML and CSS is a must."
    }
  },
  {
    title: "Introduction to Algorithms and Data Structures",
    content: {
      subheader: "Understanding Efficiency in Coding",
      body: "Algorithms and data structures form the backbone of computer science and software engineering. This guide introduces key concepts such as arrays, linked lists, stacks, queues, and trees. You'll explore sorting and searching algorithms, understand algorithmic complexity, and learn how to apply these concepts to solve real-world problems efficiently."
    }
  },
  {
    title: "Learning Object-Oriented Programming with Java",
    content: {
      subheader: "Designing Scalable Applications",
      body: "Java is renowned for its robustness and scalability, making it a top choice for building enterprise-level applications. This comprehensive guide delves into object-oriented programming principles such as classes, objects, inheritance, polymorphism, and encapsulation. You'll discover how to structure Java applications, manage dependencies with Maven, and deploy your projects."
    }
  }
]

# Create BlogPost records
puts "Seeding BlogPosts..."

posts.each do |post|
  blog = BlogPost.new(
    title: post[:title],
    category: "Programming",
    user_id: User.pluck(:id).sample,
    content: post[:content]  # Directly assign the content hash
  )
  blog.photo.attach(io: URI.open(images.sample), filename: 'blog_image.jpg')

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
  { name: "Portfolio Website", description: "Personal portfolio showcasing projects and skills", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "E-Commerce Platform", description: "Online marketplace for buying and selling products", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Task Management App", description: "Web application for managing tasks and projects", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Social Networking Site", description: "Connect with friends and share updates online", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) },
  { name: "Recipe Sharing Platform", description: "Discover and share recipes with a community of food enthusiasts", user_id: User.pluck(:id).sample, technology_ids: Technology.pluck(:id).sample(3) }
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
end

puts "Projects Seeded Successfully!"
puts "Data Seeded Successfully!"
