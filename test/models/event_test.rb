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
#  game_id          :integer          not null
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
