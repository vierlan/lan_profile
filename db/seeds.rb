# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
3.times do

 User.create(
    email: Faker::Internet.email,
    password: "password",
    username: Faker::Internet.username
  )
end



BlogPost.destroy_all

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
  blog.save!
end



puts "Data Seeded Successfully!"
