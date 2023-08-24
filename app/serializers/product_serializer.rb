class ProductSerializer
  include JSONAPI::Serializer
  attributes :name, :price, :product_url, :color, :product_photo, :product_photo_url
end
