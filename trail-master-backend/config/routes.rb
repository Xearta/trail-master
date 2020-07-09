Rails.application.routes.draw do
  resources :trails do
    resources :comments
  end

  resources :comments
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
