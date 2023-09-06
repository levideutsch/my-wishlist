class UsersController < ApplicationController
  # before_action :set_user, only: %i[ show update destroy ]

  skip_before_action :authorize, only: [:create, :show, :all_users]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :ok
  end

  def current_logged_user
    user = current_user
    render json: user.as_json(
      include: {
        profile: { methods: [:profile_photo_url] },
        products: { methods: [:product_photo_url, :product_photo], only: [:id, :name, :price, :color, :product_url] } 
      }
    )
  end

  def show
    user = current_user
    render json: user.as_json(
      include: 
      { profile: { methods: [:profile_photo_url] },
      products: { methods: [:product_photo_url, :product_photo] } 
      })
  end

  def all_users
    users = User.all
    render json: users
  end


  private 

  def user_params
      params.permit(:username, :password, :password_confirmation)
  end

end

  # def current_logged_user
  #   user = current_user
  #   render json: current_user.as_json(include: [:profile])
  # end

  # def current_logged_user
  #   user = current_user
  #   render json: user.as_json(include: { profile: { methods: [:profile_photo_url] } })
  # end
