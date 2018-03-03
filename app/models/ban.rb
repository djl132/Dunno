class Ban < ApplicationRecord
  belongs_to :banned_user, class_name: "User"
  belongs_to :banned_group, class_name: "Group"
end
