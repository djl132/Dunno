class Conversation < ApplicationRecord

  # create SQL getter/setter methods
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  has_many :messages, dependent: :destroy

  belongs_to :deleted_by_sender, class_name: "User"
  belongs_to :deleted_by_reciever, class_name: "User"

  validates_presence_of :sender_id, :recipient_id

end
