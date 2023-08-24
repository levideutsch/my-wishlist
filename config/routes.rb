Rails.application.routes.draw do
  resources :categories
  resources :products
 
  get "/current-user", to: "users#current_logged_user"
  get "/latest-profile", to: "profiles#latest_profile"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
 

  get "/latest", to: "posts#latest"
  get "/all-users", to: "users#all_users"

  resources :profiles
  resources :posts
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
