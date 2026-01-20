PRAGMA foreign_keys = ON;

-- =========================
-- User
-- =========================
DELETE FROM users;
INSERT INTO users (id, email)
VALUES (
    1,
    'user@gmail.com'
);

-- =========================
-- Habits
-- =========================
DELETE FROM habits;
INSERT INTO habits (id, user_id, name, description, category, goal)
VALUES
(
    1,
    1,
    'Drink Water',
    'Drink at least 8 glasses of water',
    'Health',
    8
),
(
    2,
    1,
    'Read',
    'Read at least 20 minutes',
    'Productivity',
    1
);

-- =========================
-- Entries
-- =========================
DELETE FROM entries;
INSERT INTO entries (id, habit_id, completed_on)
VALUES
(1, 1, '2026-01-13'),
(2, 1, '2026-01-14'),
(3, 1, '2026-01-15'),
(4, 2, '2026-01-14'),
(5, 2, '2026-01-16');

