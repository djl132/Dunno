class Adminship < ApplicationRecord
  belongs_to :admin, class_name: "User"
  belongs_to :admin_group, class_name: "Group"
end
