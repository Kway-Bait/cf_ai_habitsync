-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =========================
-- Users
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =========================
-- Habits
-- =========================
CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    goal INTEGER NOT NULL CHECK (frequency >= 1),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    archived_at TEXT,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================
-- Habit Completions
-- =========================
CREATE TABLE IF NOT EXISTS habit_completions (
    id TEXT PRIMARY KEY,
    habit_id TEXT NOT NULL,
    completed_on TEXT NOT NULL, -- YYYY-MM-DD
    created_at TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (habit_id)
    REFERENCES habits(id)
    ON DELETE CASCADE,

    UNIQUE (habit_id, completed_on)
);

-- =========================
-- Indexes
-- =========================
CREATE INDEX IF NOT EXISTS idx_habits_user_id
ON habits(user_id);

CREATE INDEX IF NOT EXISTS idx_completions_habit_date
ON habit_completions(habit_id, completed_on);
