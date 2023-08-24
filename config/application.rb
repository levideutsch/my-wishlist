# require_relative "boot"

# require "rails/all"

# # Require the gems listed in Gemfile, including any gems
# # you've limited to :test, :development, or :production.
# Bundler.require(*Rails.groups)

# module MyWishlist
#   class Application < Rails::Application
#     # Initialize configuration defaults for originally generated Rails version.
#     config.load_defaults 7.0

#     # Configuration for the application, engines, and railties goes here.
#     #
#     # These settings can be overridden in specific environments using the files
#     # in config/environments, which are processed later.
#     #
#     # config.time_zone = "Central Time (US & Canada)"
#     # config.eager_load_paths << Rails.root.join("extras")

#     # Only loads a smaller set of middleware suitable for API only apps.
#     # Middleware like session, flash, cookies can be added back manually.
#     # Skip views, helpers and assets when generating a new resource.
#     config.api_only = true
#   end
# end

require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module MyWishlist
  class Application < Rails::Application
    config.load_defaults 7.0

    # Application-specific configuration can be added here.
    #
    # These settings can be customized for different environments
    # using files in the config/environments directory.
    #
    # Example:
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Configure the application to work as an API-only application.
    # Some middleware like session, flash, and cookies are excluded
    # by default, but can be added manually if needed.
    # Views, helpers, and assets are also skipped when generating
    # new resources.
    # config.api_only = true

    # Enable sessions and configure the session store
    config.session_store :cookie_store, key: '_my_wishlist_session'

    # Enable sessions middleware
    config.middleware.use ActionDispatch::Session::CookieStore
  end
end