# == Schema Information
#
# Table name: outings
#
#  id         :integer          not null, primary key
#  event_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Outing < ActiveRecord::Base
  validates :event_id, presence: true, uniqueness: { scope: :user_id, message: "One slot per User" }
  validates :user_id, presence: true, uniqueness: { scope: :event_id, message: "One slot per User" }

  belongs_to :user, inverse_of: :outings
  belongs_to :event, inverse_of: :outings
end
