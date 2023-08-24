class ProfileSerializer
  include JSONAPI::Serializer
  attributes :id, :full_name, :age, :sex, :profile_photo, :profile_photo_url
end
