class Product < ApplicationRecord
    belongs_to :user
    belongs_to :category
    has_one_attached :product_photo

    def product_photo_url
        Rails.application.routes.url_helpers.url_for(product_photo) if product_photo.attached?
    end
    
end
