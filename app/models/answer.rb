# TO DOS
# test out nested_comments
# test out upvotes
# test out downvotes
# test out points
# test out inittialie rank
class Answer < ApplicationRecord
  # CREATE VIRTUAL ATTRIBUTES TO ASSIGN REFERENCED COLUMNS IN THE TABLE
  belongs_to :user
  belongs_to :question
  has_many :comments, dependent: :destroy
  has_many :votes, dependent: :destroy
  validates :body, presence: true

  # after_save :update_rank

  # def as_json(options = {})
  #   super(options.merge(include: [:user, comments: {include: :user}] ))
  # end
  #
    def nested_comments
      Comment.json_tree(comments)
    end

    def up_votes
      votes.where(value: 1).count
    end

    def down_votes
      votes.where(value: -1).count
    end

    def update_votes
      update_attribute(:upvotes, up_votes)
      puts up_votes
      update_attribute(:downvotes, down_votes)
      puts down_votes
    end

    def points
      votes.sum(:value)
    end

    def initialize_rank
      initial_rank = (Time.now - Time.new(1970,1,1))/1.day.seconds
      puts "NEW ANSWER'S RANK: #{self.rank}"
      update_attribute(:rank, initial_rank)
    end

# update rank every time a vote is created
    def update_rank
       if votes.count > 0
         puts "OLD RANK #{rank}"
         new_rank = rank + points
         update_attribute(:rank, new_rank)
         puts "POITNS ANSWER HAS: #{points}"
         puts "NEW RANK #{rank}"
       end
    end

# gets all public posts using a query metho
# IS THIS A CASE WEHRE THE JOIN TABLE CREATED BY THE INDEX IS USED? LOLS YEAH NOPE I'M STILL CONFUSED. BUT ESSENTIALLY IT'S RETRIEV
# HOW IS HTIS AN INNER JOIN, THOUGH?
#
# scope :visible_to, -> (user) {user  ? all : joins(:topic).where('topic.public'  => true)}
# scope :favorited_by, -> (user) {user  ? find_by('favorite.user' => user) : nil}


default_scope { order('rank DESC') }


end
