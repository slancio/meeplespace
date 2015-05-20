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

  require 'addressable/uri'

  def self.find_by_bgg_id(bg_id)
    Game.find_by(bgg_id: bg_id)
  end

  def self.search_bgg(title)
    bgg_query_root = 'http://www.boardgamegeek.com/xmlapi2/search?query='
    query_string = bgg_query_root + title
    RestClient.get(Addressable::URI.parse(query_string).normalize.to_str, { accept: :xml }){ |response, request, result|
      case response.code
      when 200
        boardgames = Nokogiri::XML(response).xpath("//item").select { |item| item.attributes["type"].value == "boardgame" }

        boardgames.each do |game|
          pass_or_add_game(*parse_BGG_XML(game))
        end

        return search_app(title)
      else
        render json: ["Call to BoardGameGeek XML API returned invalid result."], status: response.code
      end
    }
  end

  private

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

    def self.pass_or_add_game(id, title, year)
      if Game.find_by_bgg_id(id).nil?
        game = Game.new(bgg_id: id, title: title)
        game.year = year unless year.nil?
        game.save
      end
    end

    def self.parse_BGG_XML(boardgame)
      bg_id = boardgame.attributes["id"].value.to_i
      bg_title = boardgame.css("name")[0].attributes["value"].value
      if boardgame.css("yearpublished").empty?
        bg_year = nil
      else
        bg_year = boardgame.css("yearpublished")[0].attributes["value"].value.to_i
      end

      return bg_id, bg_title, bg_year
    end

    def self.search_app(title)
      Game.search_by_title(title)
    end

end
