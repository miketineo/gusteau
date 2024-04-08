# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
# Load Files from json
#
logger = Logger.new(STDOUT)
ING_PATTERN = /^((?:\d+\s*[\u{2150}-\u{215E}\u{00BC}-\u{00BE}]*|½+|[\u{2150}-\u{215E}\u{00BC}-\u{00BE}]+)\s*)?(?:(\w+)\s+)?(.+)$/
recipes = JSON.load_file('./recipes-en.json')
total = recipes.size

recipes.each_with_index do |rcp, idx|
  # building an object to old the associations.
  logger.info "Creating #{rcp["title"]} #{idx} / #{total}"
  recipe = Recipe.create(
    title: rcp["title"],
    cuisine: rcp["cuisine"],
    cook_time: rcp["cook_time"],
    prep_time: rcp["prep_time"],
    image: rcp["image"],
    author: rcp["author"],
    category: rcp["category"],
    ratings: rcp["ratings"]
    )
    logger.info "created #{recipe.id}}"
  rcp["ingredients"].each do |ig|

    match_data = ig.match(ING_PATTERN)
    # logger.info "Matched Data: #{match_data}}"
    quantity = match_data[1]&.strip&.to_f || 0.0 if match_data
    unit = match_data[2] if match_data
    ingredient = match_data[3].strip  if match_data
    print "."
      begin i = Ingredient.find_or_create_by!(name: ingredient) do |i|
        recipe.items << Item.create(ingredient: i, qty: quantity, unit: unit)
        #logger.info "added ingredient for Recipe id: #{recipe.id}}"
      rescue ActiveRecord::RecordNotUnique => e
        logger.info "Duplicated entry: #{e.message}"
        next
      end

    end
    puts `clear`
  end
end
