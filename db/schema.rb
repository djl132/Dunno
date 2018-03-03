# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170707003404) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adminships", force: :cascade do |t|
    t.integer  "admin_id"
    t.integer  "admin_group_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["admin_group_id"], name: "index_adminships_on_admin_group_id", using: :btree
    t.index ["admin_id"], name: "index_adminships_on_admin_id", using: :btree
  end

  create_table "answers", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "body"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "question_id"
    t.integer  "upvotes"
    t.integer  "downvotes"
    t.float    "rank"
    t.index ["question_id"], name: "index_answers_on_question_id", using: :btree
    t.index ["user_id"], name: "index_answers_on_user_id", using: :btree
  end

  create_table "bans", force: :cascade do |t|
    t.integer  "banned_user_id"
    t.integer  "banned_group_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["banned_group_id"], name: "index_bans_on_banned_group_id", using: :btree
    t.index ["banned_user_id"], name: "index_bans_on_banned_user_id", using: :btree
  end

  create_table "comment_hierarchies", id: false, force: :cascade do |t|
    t.integer "ancestor_id",   null: false
    t.integer "descendant_id", null: false
    t.integer "generations",   null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "comment_anc_desc_udx", unique: true, using: :btree
    t.index ["descendant_id"], name: "comment_desc_idx", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.integer  "user_id"
    t.integer  "answer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "parent_id"
    t.index ["answer_id"], name: "index_comments_on_answer_id", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "conversations", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "owner_id"
    t.integer  "deleted_by_reciever_id"
    t.integer  "deleted_by_sender_id"
    t.index ["deleted_by_reciever_id"], name: "index_conversations_on_deleted_by_reciever_id", using: :btree
    t.index ["deleted_by_sender_id"], name: "index_conversations_on_deleted_by_sender_id", using: :btree
    t.index ["owner_id"], name: "index_conversations_on_owner_id", using: :btree
    t.index ["recipient_id"], name: "index_conversations_on_recipient_id", using: :btree
    t.index ["sender_id"], name: "index_conversations_on_sender_id", using: :btree
  end

  create_table "followings", force: :cascade do |t|
    t.integer  "following_user_id"
    t.integer  "following_question_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["following_question_id"], name: "index_followings_on_following_question_id", using: :btree
    t.index ["following_user_id"], name: "index_followings_on_following_user_id", using: :btree
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "avatar"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_memberships_on_group_id", using: :btree
    t.index ["user_id"], name: "index_memberships_on_user_id", using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.text     "body"
    t.integer  "conversation_id"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["conversation_id"], name: "index_messages_on_conversation_id", using: :btree
    t.index ["user_id"], name: "index_messages_on_user_id", using: :btree
  end

  create_table "questions", force: :cascade do |t|
    t.text     "title"
    t.json     "body"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "expires_on"
    t.datetime "last_active"
    t.index ["group_id"], name: "index_questions_on_group_id", using: :btree
    t.index ["last_active"], name: "index_questions_on_last_active", using: :btree
    t.index ["user_id"], name: "index_questions_on_user_id", using: :btree
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "reviewer_id"
    t.integer  "reviewed_id"
    t.text     "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "friendliness"
    t.integer  "clarity"
    t.integer  "accuracy"
    t.index ["reviewed_id"], name: "index_reviews_on_reviewed_id", using: :btree
    t.index ["reviewer_id"], name: "index_reviews_on_reviewer_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "username"
    t.text     "bio"
    t.text     "classes"
    t.text     "major"
    t.text     "avatar"
    t.integer  "role"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  create_table "votes", force: :cascade do |t|
    t.integer  "value"
    t.integer  "user_id"
    t.integer  "answer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["answer_id"], name: "index_votes_on_answer_id", using: :btree
    t.index ["user_id"], name: "index_votes_on_user_id", using: :btree
  end

  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "users"
  add_foreign_key "comments", "answers"
  add_foreign_key "comments", "users"
  add_foreign_key "memberships", "groups"
  add_foreign_key "memberships", "users"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users"
  add_foreign_key "questions", "groups"
  add_foreign_key "questions", "users"
  add_foreign_key "votes", "answers"
  add_foreign_key "votes", "users"
end
