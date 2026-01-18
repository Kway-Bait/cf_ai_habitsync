PRAGMA foreign_keys = ON;

-- =========================
-- User
-- =========================
INSERT INTO users (id, email)
VALUES (
    'user1',
    'user@gmail.com'
);

-- =========================
-- Habits
-- =========================
INSERT INTO habits (id, user_id, name, description, frequency)
VALUES
(
    'habit_1',
    'user_1',
    'Drink Water',
    'Drink at least 8 glasses of water',
    8
),
(
    'habit_2',
    'user_1',
    'Read',
    'Read at least 20 minutes',
    1
);

-- =========================
-- Habit Completions
-- =========================
INSERT INTO habit_completions (id, habit_id, completed_on)
VALUES
('hc_1', 'habit_1', '2026-01-13'),
('hc_2', 'habit_1', '2026-01-14'),
('hc_3', 'habit_1', '2026-01-15'),
('hc_4', 'habit_2', '2026-01-14'),
('hc_5', 'habit_2', '2026-01-16');

