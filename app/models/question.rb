class Question < ApplicationRecord
  # attr_accessible :body, :group, :title
  belongs_to :user
  belongs_to :group

  has_many :answers, dependent: :destroy
  has_many :followings, foreign_key: "following_question_id"
  has_many :following_users, class_name: "User", foreign_key: "following_question_id", through: :followings

  validates :title, length: {minimum: 7}, presence: true
  validates :body, length: {minimum: 7}, presence: true
  validates :group, presence: {message:
    "Sorry, the class does not exist now! Create It!"}
  validates :user, presence: {message: "Sorry, you must be logged in!"}



# FILE UPLOADS

#  has_attached_file :image, styles: { large: "500x500>", medium: "300x300>", small: "150x150>", thumb: "50x50!" }
# validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
#
# has_attached_file :file
# validates_attachment_content_type :file, content_type: /\Aapplication\/.*\z/


  # OVERRIDE
  # # TO INCLUDE question and answer's USER for each JSON REQUEST
  #  def as_json(options = {})
  #      super(options.merge(methods: :following_users, include: [:group, :user, :followings, answers: {include: [:user, comments: {include: :user } ] } ] ))
  #  end


  # def rank_for(user)
  #   age = (created_at - Time.new(1970,1,1))/1.day.seconds
  #   rank = age
  #   rank = rank + 1 if user.groups.include?(group)
  #   rank  = rank + 1 if user.following_questions.include?(self)
  #   return rank
  # end
  # #


  def self.configured_questions_for(user)
# change create_at to last_active
    Question.select("q.*,
          q.created_at + (
            CASE
               WHEN m.group_id IS NOT NULL AND f.following_user_id IS NOT NULL THEN INTERVAL '2 days'
               WHEN f.following_user_id IS NOT NULL THEN INTERVAL '1 day'
               WHEN m.group_id IS NOT NULL THEN INTERVAL '1 day'
               ELSE INTERVAL '0 days'
            END) AS rank")
            .from('questions q')
            .joins("LEFT JOIN memberships as m ON q.group_id = m.group_id").where("m.user_id =  ?", user.id)
            .joins("LEFT JOIN followings as f ON f.following_question_id = q.id").where("f.following_user_id = ?", user.id)
            .order('rank DESC')
  end


  # SQL search stuff - reconfigure later to SQL.


  # def self.search_questions_in_group(group, search){
  #   questions_of_group = Question.where(group_id: group.id)
  #   questions_of_group.select { |g|
  #     title search
  #   }
  # }
  #
  # def self.configure_rank(user)
  #   self.all.sort { |x,y|  y.rank_for(user) <=> x.rank_for(user)}
  # end
  #


 private

   def expires_in
     (expires_on - updated_at).to_f/1.day.to_f
   end

 # def following
 #   return current_user.id == user.id
 # end



#   SEARCH QUESTIONS!!!!
# # need to be able to access child attribute name value.
#     def self.search_for(search)
#       # Tagging.find(id: self.id, )
#       joins(:tags).where("title LIKE ? OR body LIKE ? OR name LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
#
#       # where("title LIKE ? OR body LIKE ?", "%#{search}%", "%#{search}%").joins(:tags).where("name LIKE ?", "%#{search}%")
#
#     end


# search by tags.
# need to be able to access child attribute name value.
    # def self.search_for(search)
    #   # Tagging.find(id: self.id, )
    #   joins(:tags).where("title LIKE ? OR body LIKE ? OR name LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
    #
    #   # where("title LIKE ? OR body LIKE ?", "%#{search}%", "%#{search}%").joins(:tags).where("name LIKE ?", "%#{search}%")
    #
    # end


    # default_scope { order('set_rank DESC') }


end
