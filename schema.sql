-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =========================
-- Users
-- =========================
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,  -- UUID
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =========================
-- Habits
-- =========================
DROP TABLE IF EXISTS habits;
CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    goal INTEGER NOT NULL CHECK (goal >= 1),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    archived_at TEXT,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================
-- Entries
-- =========================
DROP TABLE IF EXISTS entries;
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER NOT NULL,
    completed_on TEXT NOT NULL, -- YYYY-MM-DD
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (habit_id)
    REFERENCES habits(id)
    ON DELETE CASCADE
);

-- =========================
-- LLM Messages
-- =========================
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================
-- LLM Summaries
-- =========================
DROP TABLE IF EXISTS habit_summaries;
CREATE TABLE IF NOT EXISTS habit_summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    period_start TEXT NOT NULL, -- YYYY-MM-DD
    period_end TEXT NOT NULL,
    summary TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    UNIQUE(user_id, period_start, period_end),
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================
-- LLM User Summary
-- =========================
DROP TABLE IF EXISTS profile_summary;
CREATE TABLE IF NOT EXISTS profile_summary (
    user_id TEXT PRIMARY KEY,
    summary TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


-- =========================
-- Indexes
-- =========================
CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_habits_user_id
ON habits(user_id);

CREATE INDEX IF NOT EXISTS idx_entries_habit_date
ON entries(habit_id, completed_on);

CREATE INDEX idx_messages_user_time
ON messages(user_id, created_at);
