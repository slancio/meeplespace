class UsersController < ApplicationController

  before_action :require_signed_in!, only: [:edit, :update, :destroy]
  before_action :verify_owner, only: [:edit, :update, :destroy]

  def new
    @user = User.new
    @cities = City.all
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_url
  end

  def edit
    @user = User.find(params[:id])
    @cities = City.all
    render :edit
  end

  def update
    @user = User.update(user_params)
    if @user.save
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :nickname, :city_id, :password)
    end

    def verify_owner
      user = User.find(params[:id])
      unless current_user == user
        redirect_to :forbidden
      end
    end
end