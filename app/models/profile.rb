class Profile < ApplicationRecord

    belongs_to :user
    has_one_attached :profile_photo

    validates :full_name, presence: true
    validates :age, presence: true
    validates :sex, presence: { message: "Please select a sex" },
                  exclusion: { in: ['Select Sex'], message: "Please select a valid sex option" }
    validate :profile_photo_presence
   


    def profile_photo_url
        Rails.application.routes.url_helpers.url_for(profile_photo) if profile_photo.attached?
    end

    private

    def profile_photo_presence
        unless profile_photo.attached?
          errors.add(:profile_photo, "must be attached")
        end
      end

    # def profile_photo_presence
    #   errors.add(:profile_photo, "must be attached") unless profile_photo.attached?
    # end

    # def profile_photo_presence
    #     return unless profile_photo.attached?

    #     unless profile_photo.content_type.in?(%w[image/jpeg image/png])
    #         errors.add(:profile_photo, "File must be a JPEG, or PNG")
    #     end
    # end
 
end
