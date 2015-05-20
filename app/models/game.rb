# == Schema Information
#
# Table name: games
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  img_url    :string
#  bgg_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  year       :integer
#

class Game < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_title,
                  :against => :title,
                  :ignoring => :accents,
                  :using => {
                    :tsearch => {
                      :prefix => true,
                      :any_word => true
                    }
                  }

  validates :title, presence: true
  validates :bgg_id, presence: true, uniqueness: true
  validates :year, numericality: { only_integer: true }, allow_nil: true

  has_many :events

  def self.find_by_bgg_id(bg_id)
    Game.find_by(bgg_id: bg_id)
  end

  def get_img_url
    bgg_query = 'http://www.boardgamegeek.com/xmlapi2/thing?id=' + self.bgg_id.to_str
    RestClient.get(bgg_query, { accept: :xml }){ |response, request, result|
      case response.code
      when 200
        parsedUrl = Nokogiri::XML(response).css("image")
        unless parsedUrl.empty?
          self.img_url = parsedUrl.text
        end
      end
    }
  end
end
