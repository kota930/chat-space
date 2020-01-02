class Group < ApplicationRecord
  has_many :group_user
  has_many :messages
  has_many :users, through: :group_user
  validates :name, presence: true, uniqueness: true
end
