module Api
  class CitiesController < ApiController
    def index
      @cities = City.all
      render :index
    end

    def show
      @city = City.find(params[:id])
      render :show
    end

    private

      def city_params
        params.require(:city).permit(:id)
      end
  end
end