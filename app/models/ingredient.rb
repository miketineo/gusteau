class Ingredient < ApplicationRecord
  has_many :items
  has_many :recipe

  scope :with_name, -> (name) { where(name: name) }
end
