 Rails.application.routes.draw do


  devise_for :users, controllers: { confirmations: 'confirmations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do

      post '/users/search_user', to: 'users#search_user'
      resources :users do
        resources :reviews
      end

      get '/conversations/conversations_of_current_user', to: 'conversations#conversations_of_current_user'
      get '/conversations/:recipient_id/pages/:page', to: 'conversations#show'
      resources :conversations, except: :show

      resources :messages, only: :create

      resources :statuses, only: [:create, :update, :destroy]

      get '/followings' => 'followings#index'

      resources :adminships, only: :create
      delete 'adminships/:group_id/user/:user_id', to: 'adminships#destroy'

      get '/questions_page/:page', to: 'questions#index'
      get '/groups_page/:page', to: 'groups#index'

      resources :questions, except: :index do
          resources :answers, except: :index
          resources :followings, only: [:create, :destroy]
        end

        # search for quesitons and users
        post '/root_search', to: 'questions#root_search'
        # serach for uyqseitons in a gorup
        post '/search_in_group', to: 'questions#search_in_group'
        # search for group
        post '/search_for_group', to: 'groups#search_for_group'

        resources :groups do
          resources :questions

          delete '/memberships', to: 'memberships#destroy'
          resources :memberships, only: :create

          delete '/bans/:user_id', to: 'bans#destroy'
          resources :bans, only: :create

        end


        get 'show_comments/:id', to: 'comments#show_comments'
        get 'show_children_comments/:id', to: 'comments#show_children_comments'
        resources :answers, only: [:show,:create,:destroy,:update] do

          resources :comments, except: [:index, :show]

            post '/up-vote' => 'votes#up_vote', as: :up_vote
            post '/down-vote' => 'votes#down_vote', as: :down_vote
            # put '/upvote' => 'answers#upvote'
            # put '/dwonvote' => 'answers#downvote'

        end
      end
    end


    # PASS ROOT & ALL UNRECOGNIZED FE ROUTES, TO THE BACKEND TEMPLATE,
    # WITH UIROUTER AND ANGUALR.
      root to: 'application#angular'
      get "*unmatched_route", to: "application#angular"
end
