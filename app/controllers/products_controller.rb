class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show edit update destroy ]

  # GET /products
  def index
    products = Product.all
    render json: products
  end

  def create
    category = Category.find_by(name: params[:name])
    if category == nil 
        render json: {error: "Category or text body blank"}, status: :unprocessable_entity
    else 
        product = current_user.products.create!(
            name: params[:name],
            price: params[:price],
            product_url: params[:product_url],
            color: params[:color],
            category_id: category.id
        )
        render json: product, status: :ok
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_product
    #   @product = Product.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:name, :price, :product_url, :color, :user_id, :category_id)
    end
end
