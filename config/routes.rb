Rails.application.routes.draw do
  devise_for :users
  root to: "api/v1/blog_posts#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
 # root "posts#index"
get "api/v1/posts" => "api/v1/blog_posts#index", as: 'api/v1/posts'
 # API routes should be in /api/v1 and versioned.
  namespace :api do
    namespace :v1 do
      resources :blog_posts

    end
  end
end
