class Review < ApplicationRecord
  belongs_to :reviewer, class_name: "User"
  belongs_to :reviewed, class_name: "User"

  before_save {self.friendliness ||= 0}
  before_save {self.accuracy ||= 0}
  before_save {self.clarity ||= 0}

  # validates :content, length: {minimum: 1}, presence: true

  #
  # def as_json(options={})
  #     super(options.merge(include:[:reviewer, :reviewed]))
  # end




end
