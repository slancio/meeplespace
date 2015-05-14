module Api
  class EventsController < ApiController
    before_action :require_signed_in!, except: [:show]
    before_action :require_host, except: [:show, :index]

    def index
      if current_user.host
        @events = current_user.hosted_events + current_user.events
      else
        @events = current_user.events
      end
      render :index
    end

    def show
      @event = Event.find(params[:id])
      render :show
    end

    def create
      @event = current_user.hosted_events.new(board_params)

      if @event.save
        render :show
      else
        render json: @event.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @event = current_user.hosted_events.find(params[:id])
      if @event.save
        render :show
      else
        render json: @event.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @event = current_user.hosted_events.find(params[:id])
      @event.try(:destroy)
      render :show
    end

    private

      def require_host
        render json: ["You can't perform this action if you are not a host."], status: 403
      end

      def event_params
        params.require(:event).permit(:id, :date, :location,
                                      :location_privacy, :slots,
                                      :host_id, :game_id, :city_id)
      end
  end
end