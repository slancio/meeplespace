module Api
  class EventsController < ApiController
    before_action :require_signed_in!, except: [:show]
    before_action :require_host, except: [:show, :index]

    def index
      if current_user
        @events = current_user.city.events
      else
        @events = Event.all
      end
      # This BADLY needs to be fixed.
      # Probably will need to set a city with a cookie whether user is logged in or not
      render :index
    end

    def show
      @event = Event.find(params[:id])
      render :show
    end

    def create
      @event = current_user.hosted_events.new(event_params)

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
        unless current_user.host 
          render json: ["You can't perform this action if you are not a host."], status: 403
        end
      end

      def event_params
        params.require(:event).permit(:date, :location, :location_privacy,
                                      :slots, :game_id)
      end
  end
end