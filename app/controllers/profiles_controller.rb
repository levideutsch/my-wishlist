class ProfilesController < ApplicationController
  # before_action :set_profile, only: %i[ show edit update destroy ]
  skip_before_action :authorize, only: [:show, :update, :create]

# Create new profile belonging to current_user


# def create
#   profile = current_user.profile.create!(profile_params)
#   render json: profile, status: :ok
# end

def create 
  if current_user.profile
    render json: { error: "User has existing profile" }
  else 
    profile = current_user.build_profile(profile_params)
    if profile.save 
      render json: profile, status: :created
    else
      render json: { error: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end
end

# def create
#   @profile = current_user.build_profile(
#     full_name: params[:full_name],
#     age: params[:age],
#     sex: params[:sex]
#   )

#   @profile.profile_photo.attach(params[:profile_photo]) if params[:profile_photo]

#   if @profile.save
#     render json: @profile, status: :created
#   else
#     render json: { error: @profile.errors.full_messages }, status: :unprocessable_entity
#   end
# end



# def create
#   @profile = current_user.profile.build(
#     full_name: params[:full_name],
#     age: params[:age],
#     sex: params[:sex],
#     profile_photo: params[:profile_photo]
#   )
#   unless @profile.save
#     render json: {error: "Profile not created"}
#   end
# end


def destroy
  profile = current_user.profile.destroy
  render json: {}
end


def latest_profile
  @profile = Profile.last
  render json: ProfileSerializer.new(@profile).serializable_hash[:data][:attributes]
end

def index
  profiles = Profile.all
  render json: ProfileSerializer.new(profiles).serializable_hash[:data].map { |profile| profile[:attributes] }
end

  private
   
    # Only allow a list of trusted parameters through.
    def profile_params
      # params.require(:profile, :profile_photo).permit(:full_name, :age, :sex, :profile_photo)
      params.permit(:full_name, :age, :sex, :profile_photo)
    end
end
