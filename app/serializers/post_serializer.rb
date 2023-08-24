class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :image, :image_url
end
