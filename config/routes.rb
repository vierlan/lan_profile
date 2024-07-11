Rails.application.routes.draw do
  get 'api/v1/current_user', to: 'api/v1/current_user#show'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root to: "api/v1/blog_posts#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
 # root "posts#index"

# get "/blog_posts/new" => "blog_posts#new", as: 'new_blog_post'
 # API routes should be in /api/v1 and versioned.
 namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :blog_posts
    #  resources :current_user
    end
  end
end
