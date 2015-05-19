# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  nickname            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  city_id             :integer          not null
#  host                :boolean          default(FALSE), not null
#  short_desc          :text
#  long_desc           :text
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :nickname, presence: true
  validates :city_id, presence: true
  validates :host, inclusion: { in: [true, false] }

  # Paperclip validations
  has_attached_file :avatar, styles: {thumb: "130x130#"}, default_url: "missing.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  attr_reader :password
  after_initialize :ensure_session_token

  belongs_to :city

  has_many :outings, dependent: :destroy, inverse_of: :user

  has_many :events, through: :outings

  has_many :hosted_events,
    class_name: "Event",
    foreign_key: :host_id,
    primary_key: :id,
    inverse_of: :event_host

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  protected

    def ensure_session_token
      self.session_token ||= generate_session_token
    end

    def generate_session_token
      SecureRandom.urlsafe_base64(16)
    end

end
