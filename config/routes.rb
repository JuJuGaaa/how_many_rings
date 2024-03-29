Rails.application.routes.draw do
  get 'favoris/new'
  devise_for :users
  root to: "games#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :games do
    resources :offers, only: %i[create new]
  end

  resources :offers, only: %i[index destroy show edit update] do
    resources :messages, only: :create
  end

  resources :favoris, only: [:create, :destroy, :index]

  get 'account', to: "pages#account"

  # Defines the root path route ("/")
  # root "posts#index"
end
