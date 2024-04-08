class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all.limit(100)
    render json: @recipes.to_json
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe.to_json(include: :ingredients)
  end

  def create
  end

  def update
    @recipe = Recipe.update(recipe_params)
  end

  def search
    @recipe = Recipe.with_some(params[:q].split(","))
    render json: @recipe.to_json(include: :ingredients)
  end

  def with
    @recipe = Recipe.search_for(params[:q].to_s)
    render json: @recipe.to_json(include: :ingredients)
  end

  def destroy
    Recipe.find(params[:id]).destroy
  end

  private
    def recipe_params
      params.require(:recipe).permit(:title, :cuisine, :cook_time, :prep_time, :image, :author, :category)
    end
end
