                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             class Following < ApplicationRecord
  belongs_to :following_user, class_name: "User"
  belongs_to :following_question, class_name: "Question"
end
