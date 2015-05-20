# == Schema Information
#
# Table name: events
#
#  id               :integer          not null, primary key
#  date             :datetime         not null
#  location         :string           not null
#  location_privacy :boolean          default(FALSE), not null
#  slots            :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  host_id          :integer          not null
#

class Event < ActiveRecord::Base
  validates :date, presence: true
  validates :location, presence: true
  validates :location_privacy, inclusion: { in: [true, false] }
  validates :slots, presence: true, numericality: { only_integer: true }
  validates :host_id, presence: true

  belongs_to :event_host,
    class_name: "User",
    foreign_key: :host_id,
    primary_key: :id,
    inverse_of: :hosted_events

  has_one :city, through: :event_host, autosave: false
  has_many :outings, dependent: :destroy, inverse_of: :event
  has_many :attendees, through: :outings, source: :user

  default_scope { order(date: :desc) }

end
