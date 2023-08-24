class User < ApplicationRecord

    has_one :profile
    has_many :products
    has_many :categories, through: :products
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
end
