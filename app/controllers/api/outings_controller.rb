module Api
  class OutingsController < ApiController

    def create
      @outing = current_user.outings.new(outing_params)
      if @outing.save
        render :show
      else
        render json: @outing.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

      def outing_params
        params.require(:outing).permit(:event_id)
      end

  end
end
