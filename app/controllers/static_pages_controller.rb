class StaticPagesController < ApplicationController
  def root
    if current_user.nil?
      @user = User.new
    else
      @user = current_user
    end
      @cities = City.all
  end
end
