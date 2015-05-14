# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  nickname        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  city_id         :integer          not null
#  host            :boolean          default(FALSE), not null
#

class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :nickname, presence: true
  validates :city_id, presence: true
  validates :host, inclusion: { in: [true, false] }

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

  def self.find_by_credentials(user_params)
    user = User.find_by(email: user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
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
