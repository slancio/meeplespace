module Api
  class GamesController < ApiController
  
    def search
      @search_results = Game.search_bgg(params[:title])

      render :search
    end

    def show
      @game = Game.find(params[:id])
      @game.get_img_url
      render :show
    end

  end
end