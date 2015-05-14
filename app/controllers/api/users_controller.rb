module Api
  class UsersController < ApiController
  
    def index
      @users = User.where({ host: true });
      render :index
    end

    def show
      @user = User.find(params[:id])
      render :show
    end

    def create
      @user = User.new(user_params)

      if @user.save
        sign_in!(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @user = User.update(user_params)

      if @user.save
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @user = User.find(params[:id])
      @user.destroy
      render json: {}
    end

    protected

      def user_params
        self.params.require(:user).permit(:email, :nickname, :city_id, :password)
      end

  end
end