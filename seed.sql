PRAGMA foreign_keys = ON;

-- =========================
-- User
-- =========================
DELETE FROM users;
INSERT INTO users (id, name, email)
VALUES (
    'b02c3cc8-0844-40b8-850e-93f7ef3060ba', 
    'Ke Wei Yong',
    'keweiyong07@gmail.com'
);

-- =========================
-- Habits
-- =========================
DELETE FROM habits;
INSERT INTO habits (id, user_id, name, category, goal)
VALUES
(
    1,
    'b02c3cc8-0844-40b8-850e-93f7ef3060ba', 
    'Drink Water',
    'Health',
    8
),
(
    2,
    'b02c3cc8-0844-40b8-850e-93f7ef3060ba', 
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

