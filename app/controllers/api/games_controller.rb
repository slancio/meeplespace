module Api
  class GamesController < ApiController
  
    def search
      @search_results = search_app
      if @search_results.empty?
        @search_results = search_bgg
      end

      render :search
    end

    def show
      @game = Game.find(params[:id])
      @game.get_img_url
      render :show
    end

    private

      def search_bgg
        bgg_query_root = 'http://www.boardgamegeek.com/xmlapi2/search?query='
        query_string = bgg_query_root + params[:title]
        RestClient.get(query_string, { accept: :xml }){ |response, request, result|
          case response.code
          when 200
            # Fetch the XML
            bgg_xml = Nokogiri::XML(response)
            # Select only the items of type 'boardgame'
            boardgames = bgg_xml.xpath("//item").select { |item| item.attributes["type"].value == "boardgame" }

            boardgames.each do |boardgame|
              # Check if id exists in db already, if not, add to db
              bg_id = boardgame.attributes["id"].value.to_i
              
              if Game.find_by_bgg_id(bg_id).nil?
                bg_title = boardgame.css("name")[0].attributes["value"].value
                bg_year = boardgame.css("yearpublished")[0].attributes["value"].value.to_i
                
                game = Game.new()
                game.bgg_id = bg_id
                game.title = bg_title
                game.year = bg_year
                game.save
              end

            end
            # Now that database is populated, return DB's results
            return search_app
          else
            render json: ["Call to BoardGameGeek XML API returned invalid result."], status: response.code
          end
        }
      end

      def search_app
        Game.search_by_title(params[:title])
      end

  end
end