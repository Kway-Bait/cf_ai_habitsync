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
    habit_id TEXT NOT NULL,
    completed_on TEXT NOT NULL, -- YYYY-MM-DD
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (habit_id)
    REFERENCES habits(id)
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
