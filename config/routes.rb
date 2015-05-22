Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :cities, only: [:show, :index]
    resources :events, except: [:new, :edit] do
      member do
        delete :cancel
      end
    end
    resources :users, except: [:new, :edit]
    resources :games, only: [:show] do
      collection do
        get :search
      end
    end
    resources :outings, only: [:create]
    resource :session, only: [:show, :create, :destroy]
  end
end
