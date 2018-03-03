# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'random_data'

admin = User.new(
  username: 'admin',
  email: 'admin@case.edu',
  password: 'helloworld',
  role: :admin
)
admin.skip_confirmation!
admin.save!

u1 = User.new(
  username: 'u1',
  email: 'u1@case.edu',
  password: 'helloworld',
  role: :member
)
u1.skip_confirmation!
u1.save!

u2 = User.new(
  username: 'u2',
  email: 'u2@case.edu',
  password: 'helloworld',
  role: :member
)
u2.skip_confirmation!
u2.save!

users = User.all

4000.times do
  u = User.new(
  username: RandomData.random_word,
  email: "#{RandomData.random_word}@gmail.com",
  password: 'helloworld'
  )
  u.skip_confirmation!
  u.save!

end

1.times do
  group = Group.create!(
    name: "test",
    description: RandomData.random_sentence
  )
end

7.times do
  group = Group.create!(
    name: RandomData.random_word,
    description: RandomData.random_sentence
  )
end

groups = Group.all

20.times do
  question = Question.create!(
    title: RandomData.random_sentence,
    body: RandomData.random_paragraph,
    group: Group.first,
    user: users.sample
  )
  question.update_attribute(:expires_on, Time.now + 1.day)
  question.update_attribute(:last_active, Time.now)
end


2.times do
  question = Question.create!(
    title: RandomData.random_sentence,
    body: RandomData.random_paragraph,
    group: Group.second,
    user: users.sample
  )
  question.update_attribute(:expires_on, Time.now + 1.day)
  question.update_attribute(:last_active, Time.now)

end


questions = Question.all

30.times do
  answer = Answer.create!(
    body: RandomData.random_paragraph,
    question: questions.sample,
    user: users.sample
  )
  answer.update_attribute(:created_at, rand(10.minutes .. 1.year).ago)
end

answers = Answer.all


10.times do
  comment = Comment.create!(
    body: RandomData.random_paragraph,
    answer: Answer.first,
    user: users.sample,
    parent_id: []
  )
  comment.update_attribute(:created_at, rand(10.minutes .. 1.year).ago)
end

10.times do
  comment = Comment.create!(
    body: RandomData.random_paragraph,
    answer: answers.sample,
    user: users.sample,
    parent_id: []
  )
  comment.update_attribute(:created_at, rand(10.minutes .. 1.year).ago)
end

10.times do
  comment = Comment.create!(
    body: RandomData.random_paragraph,
    answer: answers.sample,
    user: users.sample,
    parent: Comment.all.sample
  )
  comment.update_attribute(:created_at, rand(10.minutes .. 1.year).ago)
end

5.times do
Conversation.create!(
  sender_id: User.all.sample.id,
  recipient_id: User.all.sample.id,
)
end

10.times do
Message.create!(
  user: User.all.sample,
  conversation: Conversation.all.sample,
  body: RandomData.random_sentence
)
end



# 30.times do
#   review = Review.create!(
#     content: "great guy, highly recommend",
#     reviewer: admin,
#     reviewed_id: usersExceptAdmin.sample,
#     friendliness: rand(1..10),
#     clarity: rand(1..10),
#     accuracy: rand(1..10)
#   )
# end

puts "Finished seeding!"
