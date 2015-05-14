# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  img_url    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class City < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :img_url, presence: true

  has_many :users

  has_many :hosts, -> { where(host: true) },
    class_name: "User",
    foreign_key: :city_id,
    primary_key: :id

  has_many :events, through: :hosts

end
