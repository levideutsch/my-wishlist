class Product < ApplicationRecord
    belongs_to :user
    belongs_to :category
    has_one_attached :product_photo

    validates :name, presence: true
    # validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :price, presence: true, numericality: {only_float: true, greater_than_or_equal_to: 0.01};
    # validates :product_url, format: { with: URI::DEFAULT_PARSER.make_regexp }
    validates :product_url, presence: true

    validates :color, presence: true
    validate :color_cannot_be_select_color
    # validate :price_cant_be_empty
    validate :product_photo_presence

    def product_photo_url
        Rails.application.routes.url_helpers.url_for(product_photo) if product_photo.attached?
    end

    private


    def product_photo_presence
        unless product_photo.attached?
          errors.add(:product_photo, "must be attached")
        end
      end

      def color_cannot_be_select_color
        if color == 'Select Color'
          errors.add(:color, "cannot be blank'")
        end
    end

    # def price_cant_be_empty
    #   if price == "NaN"
    #     errors.add(:price, "cannot be blank")
    #   end
    # end

end
