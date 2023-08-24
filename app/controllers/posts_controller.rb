class PostsController < ApplicationController

    def create 
        post = Post.create(post_params)
        render json: post, status: :ok
    end

    def latest
        @post = Post.last
        render json: PostSerializer.new(@post).serializable_hash[:data][:attributes]
    end

    def index
        posts = Post.all
        render json: PostSerializer.new(posts).serializable_hash[:data].map { |post| post[:attributes] }
    end

    private

    def post_params
        params.require(:post).permit(:title, :image)
    end
    
end
