# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150612030019) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "unaccent"

  create_table "cities", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "img_url",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "description"
  end

  add_index "cities", ["name"], name: "index_cities_on_name", unique: true, using: :btree

  create_table "events", force: :cascade do |t|
    t.datetime "date",                             null: false
    t.string   "location",                         null: false
    t.boolean  "location_privacy", default: false, null: false
    t.integer  "slots",                            null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "host_id",                          null: false
    t.integer  "game_id",                          null: false
  end

  add_index "events", ["date"], name: "index_events_on_date", using: :btree
  add_index "events", ["game_id"], name: "index_events_on_game_id", using: :btree
  add_index "events", ["host_id"], name: "index_events_on_host_id", using: :btree

  create_table "games", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "img_url"
    t.integer  "bgg_id",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "year"
    t.text     "description"
  end

  add_index "games", ["bgg_id"], name: "index_games_on_bgg_id", unique: true, using: :btree

  create_table "outings", force: :cascade do |t|
    t.integer  "event_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "outings", ["event_id", "user_id"], name: "index_outings_on_event_id_and_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                               null: false
    t.string   "nickname",                            null: false
    t.string   "password_digest",                     null: false
    t.string   "session_token",                       null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "city_id",                             null: false
    t.boolean  "host",                default: false, null: false
    t.text     "short_desc"
    t.text     "long_desc"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["city_id"], name: "index_users_on_city_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
