class CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :update, :destroy]

    def index
        @comments = Comment.all

        render json: @comments
    end

    def show
        redner json: @comment
    end

    def create
        @comment = Comment.new(comment_params)

        if @comment.save
            render json: @comment, status: :created, location: @comment
          else
            render json: @comment.errors, status: :unprocessable_entity
          end
    end

    def update
        if @comment.update(comment_params)
          render json: @comment
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @comment.destroy
    end
end