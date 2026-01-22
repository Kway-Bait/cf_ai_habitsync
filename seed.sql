PRAGMA foreign_keys = ON;

-- =========================
-- User
-- =========================
DELETE FROM users;
INSERT INTO users (email)
VALUES ('user@gmail.com');

-- =========================
-- Habits
-- =========================
DELETE FROM habits;
INSERT INTO habits (user_id, name, category, goal)
VALUES
(
    1,
    'Drink Water',
    'Health',
    8
),
(
    1,
    'Read',
    'Productivity',
    1
);

-- =========================
-- Entries
-- =========================
DELETE FROM entries;
INSERT INTO entries (habit_id, completed_on)
VALUES
(1, '2026-01-13'),
(1, '2026-01-14'),
(1, '2026-01-15'),
(2, '2026-01-14'),
(2, '2026-01-16');

