class User < ApplicationRecord

  validates :username, uniqueness: true

  # validates :from_case


  # before_save {self.role ||= :member}
  before_save {self.bio ||= "NA"}
  before_save {self.major ||= "NA"}
  before_save {self.classes ||= "NA"}
  before_save { self.role ||= :member }
  # before_save {self.taken_classes ||= "NA"}
  before_save { self.email = email.downcase if email.present? }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  has_many :conversations, foreign_key: "sender_id"

  # has_many :deleted_conversations, foreign_key: "deleted_by_"

   has_many :bans, foreign_key: "banned_user_id", dependent: :destroy
   has_many :banned_groups, class_name: "Group", foreign_key: "banned_user_id", through: :bans

  has_many :adminships, foreign_key: "admin_id", dependent: :destroy
  has_many :admin_groups, class_name: "Group", foreign_key: "admin_id", through: :adminships
  has_one :status
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :reviews_by_others, foreign_key: "reviewed_id", class_name: "Review", dependent: :destroy
  has_many :reviews_by_me, foreign_key: "reviewer_id", class_name: "Review", dependent: :destroy

# creates REALTINOAL GETTERS AND SETTERS TAHT REGULATE WHAT IS STORED IN THE DB
  has_many :followings, foreign_key: "following_user_id"
  has_many :following_questions, class_name: "Question", foreign_key: "following_user_id", through: :followings
  has_many :memberships, dependent: :destroy
  has_many :groups, through: :memberships

# add enum methods for allowing rails to talk to db
  enum role: [:member, :admin]

# GET WEKLY GROUPS WITH VOTES
    def weekly_answered_topics
      weekly_topics = Group.includes(questions: [answers: :votes]).joins(questions: [answers: :votes]).where('answers.created_at > ? AND answers.user_id = ?', 7.days.ago, self.id)
      return weekly_topics
    end

    def conversations
      Conversation.includes(:messages).where('(conversations.sender_id = ? OR conversations.recipient_id = ?) and (conversations.deleted_by_sender_id IS NULL or conversations.deleted_by_reciever_id IS NULL or  conversations.deleted_by_sender_id != ? or conversations.deleted_by_reciever_id != ?)', self.id ,self.id, self.id, self.id)
    end

    def all_answered_topics
      all_topics = Group.includes(questions: [answers: :votes]).joins(questions: [answers: :votes]).where('answers.user_id = ?', self.id)
      return all_topics
    end

    def weekly_reputation_for_topics
      weekly_answered_topics.group('name').sum('votes.value');
    end

    def reputation_for_topics
        all_answered_topics.group('name').sum('votes.value');
    end

    def reputation_level
      all_answered_topics.sum('votes.value')
    end

    def friendlyPoints
      sum = 0
      reviews_by_others.each do |review|
        puts "review is : #{review}"
          sum += review.friendliness
      end
      return sum/reviews_by_others.count if reviews_by_others.count > 0
      "NA"
    end

    def clarityPoints
      sum = 0
      reviews_by_others.each do |review|
          sum += review.clarity
      end
      return sum/reviews_by_others.count if reviews_by_others.count > 0
      "NA"
    end

    def accuracyPoints
      sum = 0
      reviews_by_others.each do |review|
          sum += review.accuracy
      end
      return sum/reviews_by_others.count if reviews_by_others.count > 0
      "NA"
    end

    def from_case

    end

private

end
