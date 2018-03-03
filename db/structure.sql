--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: adminships; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE adminships (
    id integer NOT NULL,
    admin_id integer,
    admin_group_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: adminships_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE adminships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adminships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE adminships_id_seq OWNED BY adminships.id;


--
-- Name: answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE answers (
    id integer NOT NULL,
    user_id integer,
    body text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question_id integer,
    upvotes integer,
    downvotes integer,
    rank double precision
);


--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE answers_id_seq OWNED BY answers.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: bans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE bans (
    id integer NOT NULL,
    banned_user_id integer,
    banned_group_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: bans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE bans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE bans_id_seq OWNED BY bans.id;


--
-- Name: comment_hierarchies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE comment_hierarchies (
    ancestor_id integer NOT NULL,
    descendant_id integer NOT NULL,
    generations integer NOT NULL
);


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE comments (
    id integer NOT NULL,
    body text,
    user_id integer,
    answer_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    parent_id integer
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE conversations (
    id integer NOT NULL,
    sender_id integer,
    recipient_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    owner_id integer,
    deleted_by_reciever_id integer,
    deleted_by_sender_id integer
);


--
-- Name: conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE conversations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE conversations_id_seq OWNED BY conversations.id;


--
-- Name: followings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE followings (
    id integer NOT NULL,
    following_user_id integer,
    following_question_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: followings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE followings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE followings_id_seq OWNED BY followings.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE groups (
    id integer NOT NULL,
    name character varying,
    description text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    avatar text
);


--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- Name: mailboxer_conversation_opt_outs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mailboxer_conversation_opt_outs (
    id integer NOT NULL,
    unsubscriber_type character varying,
    unsubscriber_id integer,
    conversation_id integer
);


--
-- Name: mailboxer_conversation_opt_outs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE mailboxer_conversation_opt_outs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mailboxer_conversation_opt_outs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE mailboxer_conversation_opt_outs_id_seq OWNED BY mailboxer_conversation_opt_outs.id;


--
-- Name: mailboxer_conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mailboxer_conversations (
    id integer NOT NULL,
    subject character varying DEFAULT ''::character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: mailboxer_conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE mailboxer_conversations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mailboxer_conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE mailboxer_conversations_id_seq OWNED BY mailboxer_conversations.id;


--
-- Name: mailboxer_notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mailboxer_notifications (
    id integer NOT NULL,
    type character varying,
    body text,
    subject character varying DEFAULT ''::character varying,
    sender_type character varying,
    sender_id integer,
    conversation_id integer,
    draft boolean DEFAULT false,
    notification_code character varying,
    notified_object_type character varying,
    notified_object_id integer,
    attachment character varying,
    updated_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL,
    global boolean DEFAULT false,
    expires timestamp without time zone
);


--
-- Name: mailboxer_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE mailboxer_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mailboxer_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE mailboxer_notifications_id_seq OWNED BY mailboxer_notifications.id;


--
-- Name: mailboxer_receipts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mailboxer_receipts (
    id integer NOT NULL,
    receiver_type character varying,
    receiver_id integer,
    notification_id integer NOT NULL,
    is_read boolean DEFAULT false,
    trashed boolean DEFAULT false,
    deleted boolean DEFAULT false,
    mailbox_type character varying(25),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    is_delivered boolean DEFAULT false,
    delivery_method character varying,
    message_id character varying
);


--
-- Name: mailboxer_receipts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE mailboxer_receipts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mailboxer_receipts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE mailboxer_receipts_id_seq OWNED BY mailboxer_receipts.id;


--
-- Name: memberships; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE memberships (
    id integer NOT NULL,
    user_id integer,
    group_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: memberships_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE memberships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE memberships_id_seq OWNED BY memberships.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE messages (
    id integer NOT NULL,
    body text,
    conversation_id integer,
    user_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE messages_id_seq OWNED BY messages.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE questions (
    id integer NOT NULL,
    title text,
    body json,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer,
    group_id integer,
    last_active double precision
);


--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE questions_id_seq OWNED BY questions.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE reviews (
    id integer NOT NULL,
    reviewer_id integer,
    reviewed_id integer,
    content text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    friendliness integer,
    clarity integer,
    accuracy integer
);


--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE reviews_id_seq OWNED BY reviews.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    username character varying,
    bio text,
    classes text,
    major text,
    avatar text,
    role integer,
    confirmation_token character varying,
    confirmed_at timestamp without time zone,
    confirmation_sent_at timestamp without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE votes (
    id integer NOT NULL,
    value integer,
    user_id integer,
    answer_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE votes_id_seq OWNED BY votes.id;


--
-- Name: adminships id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY adminships ALTER COLUMN id SET DEFAULT nextval('adminships_id_seq'::regclass);


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY answers ALTER COLUMN id SET DEFAULT nextval('answers_id_seq'::regclass);


--
-- Name: bans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY bans ALTER COLUMN id SET DEFAULT nextval('bans_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: conversations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY conversations ALTER COLUMN id SET DEFAULT nextval('conversations_id_seq'::regclass);


--
-- Name: followings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY followings ALTER COLUMN id SET DEFAULT nextval('followings_id_seq'::regclass);


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- Name: mailboxer_conversation_opt_outs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_conversation_opt_outs ALTER COLUMN id SET DEFAULT nextval('mailboxer_conversation_opt_outs_id_seq'::regclass);


--
-- Name: mailboxer_conversations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_conversations ALTER COLUMN id SET DEFAULT nextval('mailboxer_conversations_id_seq'::regclass);


--
-- Name: mailboxer_notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_notifications ALTER COLUMN id SET DEFAULT nextval('mailboxer_notifications_id_seq'::regclass);


--
-- Name: mailboxer_receipts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_receipts ALTER COLUMN id SET DEFAULT nextval('mailboxer_receipts_id_seq'::regclass);


--
-- Name: memberships id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY memberships ALTER COLUMN id SET DEFAULT nextval('memberships_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages ALTER COLUMN id SET DEFAULT nextval('messages_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY questions ALTER COLUMN id SET DEFAULT nextval('questions_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY reviews ALTER COLUMN id SET DEFAULT nextval('reviews_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes ALTER COLUMN id SET DEFAULT nextval('votes_id_seq'::regclass);


--
-- Name: adminships adminships_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY adminships
    ADD CONSTRAINT adminships_pkey PRIMARY KEY (id);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: bans bans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bans
    ADD CONSTRAINT bans_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: followings followings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY followings
    ADD CONSTRAINT followings_pkey PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: mailboxer_conversation_opt_outs mailboxer_conversation_opt_outs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_conversation_opt_outs
    ADD CONSTRAINT mailboxer_conversation_opt_outs_pkey PRIMARY KEY (id);


--
-- Name: mailboxer_conversations mailboxer_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_conversations
    ADD CONSTRAINT mailboxer_conversations_pkey PRIMARY KEY (id);


--
-- Name: mailboxer_notifications mailboxer_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_notifications
    ADD CONSTRAINT mailboxer_notifications_pkey PRIMARY KEY (id);


--
-- Name: mailboxer_receipts mailboxer_receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_receipts
    ADD CONSTRAINT mailboxer_receipts_pkey PRIMARY KEY (id);


--
-- Name: memberships memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: comment_anc_desc_udx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX comment_anc_desc_udx ON comment_hierarchies USING btree (ancestor_id, descendant_id, generations);


--
-- Name: comment_desc_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX comment_desc_idx ON comment_hierarchies USING btree (descendant_id);


--
-- Name: index_adminships_on_admin_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_adminships_on_admin_group_id ON adminships USING btree (admin_group_id);


--
-- Name: index_adminships_on_admin_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_adminships_on_admin_id ON adminships USING btree (admin_id);


--
-- Name: index_answers_on_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_answers_on_question_id ON answers USING btree (question_id);


--
-- Name: index_answers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_answers_on_user_id ON answers USING btree (user_id);


--
-- Name: index_bans_on_banned_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_bans_on_banned_group_id ON bans USING btree (banned_group_id);


--
-- Name: index_bans_on_banned_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_bans_on_banned_user_id ON bans USING btree (banned_user_id);


--
-- Name: index_comments_on_answer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_answer_id ON comments USING btree (answer_id);


--
-- Name: index_comments_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_user_id ON comments USING btree (user_id);


--
-- Name: index_conversations_on_deleted_by_reciever_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_conversations_on_deleted_by_reciever_id ON conversations USING btree (deleted_by_reciever_id);


--
-- Name: index_conversations_on_deleted_by_sender_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_conversations_on_deleted_by_sender_id ON conversations USING btree (deleted_by_sender_id);


--
-- Name: index_conversations_on_owner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_conversations_on_owner_id ON conversations USING btree (owner_id);


--
-- Name: index_conversations_on_recipient_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_conversations_on_recipient_id ON conversations USING btree (recipient_id);


--
-- Name: index_conversations_on_sender_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_conversations_on_sender_id ON conversations USING btree (sender_id);


--
-- Name: index_followings_on_following_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_followings_on_following_question_id ON followings USING btree (following_question_id);


--
-- Name: index_followings_on_following_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_followings_on_following_user_id ON followings USING btree (following_user_id);


--
-- Name: index_mailboxer_conversation_opt_outs_on_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_conversation_opt_outs_on_conversation_id ON mailboxer_conversation_opt_outs USING btree (conversation_id);


--
-- Name: index_mailboxer_conversation_opt_outs_on_unsubscriber_id_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_conversation_opt_outs_on_unsubscriber_id_type ON mailboxer_conversation_opt_outs USING btree (unsubscriber_id, unsubscriber_type);


--
-- Name: index_mailboxer_notifications_on_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_notifications_on_conversation_id ON mailboxer_notifications USING btree (conversation_id);


--
-- Name: index_mailboxer_notifications_on_notified_object_id_and_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_notifications_on_notified_object_id_and_type ON mailboxer_notifications USING btree (notified_object_id, notified_object_type);


--
-- Name: index_mailboxer_notifications_on_sender_id_and_sender_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_notifications_on_sender_id_and_sender_type ON mailboxer_notifications USING btree (sender_id, sender_type);


--
-- Name: index_mailboxer_notifications_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_notifications_on_type ON mailboxer_notifications USING btree (type);


--
-- Name: index_mailboxer_receipts_on_notification_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_receipts_on_notification_id ON mailboxer_receipts USING btree (notification_id);


--
-- Name: index_mailboxer_receipts_on_receiver_id_and_receiver_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailboxer_receipts_on_receiver_id_and_receiver_type ON mailboxer_receipts USING btree (receiver_id, receiver_type);


--
-- Name: index_memberships_on_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_memberships_on_group_id ON memberships USING btree (group_id);


--
-- Name: index_memberships_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_memberships_on_user_id ON memberships USING btree (user_id);


--
-- Name: index_messages_on_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_messages_on_conversation_id ON messages USING btree (conversation_id);


--
-- Name: index_messages_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_messages_on_user_id ON messages USING btree (user_id);


--
-- Name: index_questions_on_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_questions_on_group_id ON questions USING btree (group_id);


--
-- Name: index_questions_on_last_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_questions_on_last_active ON questions USING btree (last_active);


--
-- Name: index_questions_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_questions_on_user_id ON questions USING btree (user_id);


--
-- Name: index_reviews_on_reviewed_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_reviews_on_reviewed_id ON reviews USING btree (reviewed_id);


--
-- Name: index_reviews_on_reviewer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_reviews_on_reviewer_id ON reviews USING btree (reviewer_id);


--
-- Name: index_users_on_confirmation_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_confirmation_token ON users USING btree (confirmation_token);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: index_users_on_username; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_username ON users USING btree (username);


--
-- Name: index_votes_on_answer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_votes_on_answer_id ON votes USING btree (answer_id);


--
-- Name: index_votes_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_votes_on_user_id ON votes USING btree (user_id);


--
-- Name: mailboxer_notifications_notified_object; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX mailboxer_notifications_notified_object ON mailboxer_notifications USING btree (notified_object_type, notified_object_id);


--
-- Name: comments fk_rails_03de2dc08c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT fk_rails_03de2dc08c FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: questions fk_rails_047ab75908; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT fk_rails_047ab75908 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: messages fk_rails_273a25a7a6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT fk_rails_273a25a7a6 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: comments fk_rails_2b0d9d2b14; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT fk_rails_2b0d9d2b14 FOREIGN KEY (answer_id) REFERENCES answers(id);


--
-- Name: answers fk_rails_3d5ed4418f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT fk_rails_3d5ed4418f FOREIGN KEY (question_id) REFERENCES questions(id);


--
-- Name: votes fk_rails_3f8d383c32; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT fk_rails_3f8d383c32 FOREIGN KEY (answer_id) REFERENCES answers(id);


--
-- Name: answers fk_rails_584be190c2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT fk_rails_584be190c2 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: messages fk_rails_7f927086d2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT fk_rails_7f927086d2 FOREIGN KEY (conversation_id) REFERENCES conversations(id);


--
-- Name: memberships fk_rails_99326fb65d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT fk_rails_99326fb65d FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: memberships fk_rails_aaf389f138; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT fk_rails_aaf389f138 FOREIGN KEY (group_id) REFERENCES groups(id);


--
-- Name: votes fk_rails_c9b3bef597; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT fk_rails_c9b3bef597 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: questions fk_rails_d67ab57313; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT fk_rails_d67ab57313 FOREIGN KEY (group_id) REFERENCES groups(id);


--
-- Name: mailboxer_conversation_opt_outs mb_opt_outs_on_conversations_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_conversation_opt_outs
    ADD CONSTRAINT mb_opt_outs_on_conversations_id FOREIGN KEY (conversation_id) REFERENCES mailboxer_conversations(id);


--
-- Name: mailboxer_notifications notifications_on_conversation_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_notifications
    ADD CONSTRAINT notifications_on_conversation_id FOREIGN KEY (conversation_id) REFERENCES mailboxer_conversations(id);


--
-- Name: mailboxer_receipts receipts_on_notification_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailboxer_receipts
    ADD CONSTRAINT receipts_on_notification_id FOREIGN KEY (notification_id) REFERENCES mailboxer_notifications(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20170421170231'),
('20170422043330'),
('20170422043424'),
('20170422183319'),
('20170422183656'),
('20170422183729'),
('20170422190011'),
('20170422211203'),
('20170422211222'),
('20170424205620'),
('20170424231537'),
('20170426210930'),
('20170502050946'),
('20170502164028'),
('20170502200708'),
('20170502215129'),
('20170517235157'),
('20170517235217'),
('20170521001812'),
('20170521050735'),
('20170601184740'),
('20170601202817'),
('20170602022816'),
('20170603033139'),
('20170605224433'),
('20170615220634'),
('20170615221111'),
('20170615221957'),
('20170616003229'),
('20170616035619'),
('20170706004116');


