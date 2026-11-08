-- ========================================================
-- Database Schema for Recipe Hub (PostgreSQL / Supabase)
-- ========================================================

-- 1. User Table
CREATE TABLE IF NOT EXISTS "user" (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    password VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'ROLE_USER'
);

-- 2. Recipe Table
CREATE TABLE IF NOT EXISTS recipe (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    instruction TEXT,
    category VARCHAR(255),
    cuisine VARCHAR(255),
    prep_time VARCHAR(255),
    cook_time VARCHAR(255),
    like_count INT DEFAULT 0,
    average_rating DOUBLE PRECISION DEFAULT 0.0,
    total_rate_count INT DEFAULT 0,
    user_id BIGINT REFERENCES "user"(id) ON DELETE SET NULL
);

-- 3. Recipe Ingredients Table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id BIGINT NOT NULL REFERENCES recipe(id) ON DELETE CASCADE,
    ingredient VARCHAR(255)
);

-- 4. User Bookmarks Table
CREATE TABLE IF NOT EXISTS user_bookmarks (
    user_id BIGINT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    recipe_id BIGINT NOT NULL REFERENCES recipe(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, recipe_id)
);

-- 5. Image Table
CREATE TABLE IF NOT EXISTS image (
    id BIGSERIAL PRIMARY KEY,
    file_name VARCHAR(255),
    file_type VARCHAR(255),
    image BYTEA,
    download_url VARCHAR(255),
    recipe_id BIGINT UNIQUE REFERENCES recipe(id) ON DELETE CASCADE
);

-- 6. Review Table
CREATE TABLE IF NOT EXISTS review (
    id BIGSERIAL PRIMARY KEY,
    stars INT DEFAULT 0,
    feed_back TEXT,
    recipe_id BIGINT REFERENCES recipe(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES "user"(id) ON DELETE SET NULL
);

-- 7. Likes Table
CREATE TABLE IF NOT EXISTS likes (
    id BIGSERIAL PRIMARY KEY,
    recipe_id BIGINT REFERENCES recipe(id) ON DELETE CASCADE
);

-- ========================================================
-- Seed Initial Sample Data
-- Password for default users is: password123
-- ========================================================

INSERT INTO "user" (id, username, email, password, full_name, role) VALUES
(1, 'chef_john', 'john@recipehub.com', '$2a$10$vI8aWBnW3fID.ZQ4/ZO1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYeq', 'Chef John Doe', 'ROLE_USER'),
(2, 'sarah_bakes', 'sarah@recipehub.com', '$2a$10$vI8aWBnW3fID.ZQ4/ZO1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYeq', 'Sarah Jenkins', 'ROLE_USER')
ON CONFLICT (username) DO NOTHING;

INSERT INTO recipe (id, title, description, instruction, category, cuisine, prep_time, cook_time, like_count, average_rating, total_rate_count, user_id) VALUES
(1, 'Classic Spaghetti Carbonara', 'Creamy authentic Italian pasta dish with pancetta and parmesan.', '1. Boil pasta in salted water. 2. Fry pancetta until crisp. 3. Whisk eggs and grated parmesan. 4. Mix pasta with pancetta, remove from heat, and mix in egg mixture.', 'Dinner', 'Italian', '10 mins', '15 mins', 1, 5.0, 1, 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES
(1, '200g Spaghetti'),
(1, '100g Pancetta or Guanciale'),
(1, '2 Large Eggs'),
(1, '50g Pecorino Romano or Parmesan Cheese')
ON CONFLICT DO NOTHING;
