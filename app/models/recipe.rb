class Recipe < ApplicationRecord
    has_many :items
    has_many :ingredients, through: :items

    scope :with_some, -> (names) { joins(:ingredients).where('ingredients.name IN (?)', names).uniq }

end
