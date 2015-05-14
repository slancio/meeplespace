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
  belongs_to :user, inverse_of: :outing
  belongs_to :event, inverse_of: :outing
end
