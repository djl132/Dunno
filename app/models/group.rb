class Group < ApplicationRecord
  include Comparable
# ASSOICATIONS

before_save { self.name = name.upcase}

  has_many :questions, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :adminships, foreign_key: "admin_group_id", dependent: :destroy
  has_many :admins, class_name: "User", foreign_key:"admin_group_id", through: :adminships

  has_many :users, through: :memberships
  has_many :bans, foreign_key: "banned_group_id", dependent: :destroy
  has_many :banned_users, class_name: "User", foreign_key: "banned_group_id", through: :bans
# VALIDATIONS
  # validates_associated :users
  validates :name, length: {minimum: 2}, presence: true
  validates :description, length: {minimum: 10}, presence: true

# cases won't mattter in chking. GROUP == group.
  validates_uniqueness_of :name, case_sensitive: false

  def <=>(other)
       self.name <=> other.name
  end

  # def as_json(options = {})
  #   super(options.merge(include: [:questions, {include:
  #           [:user, :answers, {include:
  #             [:user, :comments, {include: :user} ]} ]}, :users ]  ))
  # end
#   def as_json(options = {})
#     super(options.merge(include: [:questions, {include:
#             [:user, :answers, {include:
#               [:user, :comments, {include: :user} ]} ]} ]  ))
#   end

end
