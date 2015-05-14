Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :cities, only: [:show, :index]
    resources :events, except: [:new, :edit]
    resources :users, except: [:new, :edit]
    resource :session, only: [:show, :create, :destroy]
  end
end
