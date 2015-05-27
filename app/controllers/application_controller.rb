class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?, :auth_token

  private

    def auth_token
      <<-HTML.html_safe
        <input type="hidden" name="authenticity_token" value="#{form_authenticity_token}">
      HTML
    end

    def current_user
      return nil unless session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def signed_in?
      !!current_user
    end

    def sign_in!(user)
      @current_user = user
      session[:session_token] = user.reset_session_token!
    end

    def sign_out!
      current_user.try(:reset_token!)
      session[:session_token] = nil
    end

    def require_signed_in!
      redirect_to root_url unless signed_in?
    end

end
