Rails.application.routes.draw do
  resources :profiles
  resources :categories
  resources :products
  resources :posts
  resources :users
 
  get "/filter-products/:id", to: "products#products_by_category"
  get "/current-user", to: "users#current_logged_user"
  get "/latest-profile", to: "profiles#latest_profile"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
 

  get "/latest", to: "posts#latest"
  get "/all-users", to: "users#all_users"

 

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
