CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    city TEXT NOT NULL,
    sex TEXT NOT NULL CHECK (sex IN ('MALE', 'FEMALE')),
    balance NUMERIC(19, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS advertisements (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(19, 2) NOT NULL,
    weight REAL NOT NULL,
    available BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    first_user_id BIGINT NOT NULL REFERENCES users(id),
    second_user_id BIGINT NOT NULL REFERENCES users(id),
    last_message TEXT NOT NULL,
    last_message_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    chat_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL REFERENCES users(id),
    recipient_id BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL,
    read BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL REFERENCES users(id),
    receiver_id BIGINT NOT NULL REFERENCES users(id),
    amount NUMERIC(19, 2) NOT NULL
);

CREATE INDEX idx_advertisements_available ON advertisements(available);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_chats_last_message_time ON chats(last_message_time);