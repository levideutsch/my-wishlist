class ProductsController < ApplicationController
  # before_action :set_product, only: %i[ show edit update destroy ]
  skip_before_action :authorize, only: [:create, :index]


  def index
    @products = current_user.products
    render json: ProductSerializer.new(@products).serializable_hash[:data].map { |product| product[:attributes] }
  end

def create
  category = Category.find_by(name: params[:product][:category_name])
  
  if category.nil?
    render json: { error: "Category or text body blank" }, status: :unprocessable_entity
  else
    product_params = preprocess_params(params[:product]).permit(
      :name,
      :price,
      :product_url,
      :color,
      :product_photo,
      :category_id
    ).merge(
      price: params[:product][:price].to_f,
      category_id: category.id
    )
    
    product = current_user.products.build(product_params)
    
    if product.save
      render json: product.as_json( methods: [:product_photo_url] ), status: :ok
    else
      render json: { error: product.errors.full_messages }, status: :unprocessable_entity
    end
  end
end


def destroy 
  product = current_user.products.find_by(id: params[:id])
  product.destroy
  render json: {}
end 

def update
  product = current_user.products.find_by(id: params[:id].to_i)
  product.update!(product_params)
  render json: product.as_json(methods: [:product_photo_url]), status: :accepted
end



def products_by_category
  products = current_user.products.filter { |product| product.category_id == params[:id].to_i }
  render json: ProductSerializer.new(products).serializable_hash[:data].map { |product| product[:attributes] }
end

  private

  def preprocess_params(product_params)
    product_params.reject { |_, value| value == "undefined" }
  end
  
    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:name, :price, :product_url, :color, :user_id, :category_id, :product_photo).select {|key, value| value != "undefined"}
      # params.permit(:name, :price, :product_url, :color, :user_id, :category_id, :product_photo)

    end
end



  # def create
  #   # debugger
  #   category = Category.find_by(name: params[:product][:category_name])
  #   if category == nil 
  #       render json: {error: "Category or text body blank"}, status: :unprocessable_entity
  #   else 
  #       product = current_user.products.create!(
  #           name: params[:product][:name],
  #           price: params[:product][:price].to_i,
  #           product_url: params[:product][:product_url],
  #           color: params[:product][:color],
  #           product_photo: params[:product][:product_photo],
  #           category_id: category.id
  #       )
  #       render json: product, status: :ok
  #   end
  # end

#   def create
#     # debugger
#     category = Category.find_by(name: params[:product][:category_name])
#     if category.nil?
#         render json: { error: "Category or text body blank" }, status: :unprocessable_entity
#     else
#         product = current_user.products.build(
#             name: params[:product][:name],
#             price: params[:product][:price].to_f, # Convert to float for price
#             product_url: params[:product][:product_url],
#             color: params[:product][:color],
#             product_photo: params[:product][:product_photo],
#             category_id: category.id
#         ).select {|key, value| value != "undefined"}
        
#         if product.save
#             render json: product, status: :ok
#         else
#             render json: { error: product.errors.full_messages }, status: :unprocessable_entity
#         end
#     end
# end

# def update
#   product = current_user.products.find_by(id: params[:id])
  
#   if product.nil?
#     render json: { error: "Product not found" }, status: :not_found
#   else
#     category = Category.find_by(name: params[:product][:category_name])

#     if category.nil?
#       render json: { error: "Category or text body blank" }, status: :unprocessable_entity
#     else
#       product_params = preprocess_params(params[:product]).permit(
#         :name,
#         :price,
#         :product_url,
#         :color,
#         :product_photo,
#         :category_id
#       ).merge(
#         price: params[:product][:price].to_f,
#         category_id: category.id
#       )
      
#       if product.update(product_params)
#         render json: product, status: :ok
#       else
#         render json: { error: product.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
#   end
# end