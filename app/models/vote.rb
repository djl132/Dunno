class Vote < ApplicationRecord

  belongs_to :user
  belongs_to :answer

  validates :value, inclusion: {in: [1,-1], message: "%{value} is not valid vote."}, presence: true


  def update_answer
    answer.update_votes
    answer.update_rank
  end
  
  private


end
