-- ========================================================
-- Database Schema for CookShare / Recipe App
-- Target Database: MySQL 8+
-- ========================================================

CREATE DATABASE IF NOT EXISTS `cook_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cook_db`;

-- 1. User Table (Enhanced with credentials & profile info)
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `email` VARCHAR(255) DEFAULT NULL,
    `password` VARCHAR(255) DEFAULT NULL,
    `full_name` VARCHAR(255) DEFAULT NULL,
    `role` VARCHAR(50) DEFAULT 'ROLE_USER',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Recipe Table
CREATE TABLE IF NOT EXISTS `recipe` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) DEFAULT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `instruction` TEXT DEFAULT NULL,
    `category` VARCHAR(255) DEFAULT NULL,
    `cuisine` VARCHAR(255) DEFAULT NULL,
    `prep_time` VARCHAR(255) DEFAULT NULL,
    `cook_time` VARCHAR(255) DEFAULT NULL,
    `like_count` INT NOT NULL DEFAULT 0,
    `average_rating` DOUBLE NOT NULL DEFAULT 0.0,
    `total_rate_count` INT NOT NULL DEFAULT 0,
    `user_id` BIGINT DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_recipe_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Recipe Ingredients Table
CREATE TABLE IF NOT EXISTS `recipe_ingredients` (
    `recipe_id` BIGINT NOT NULL,
    `ingredient` VARCHAR(255) DEFAULT NULL,
    KEY `idx_recipe_ingredients_recipe_id` (`recipe_id`),
    CONSTRAINT `fk_ingredients_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. User Bookmarks / Favorites Table
CREATE TABLE IF NOT EXISTS `user_bookmarks` (
    `user_id` BIGINT NOT NULL,
    `recipe_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `recipe_id`),
    CONSTRAINT `fk_bookmark_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_bookmark_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Image Table
CREATE TABLE IF NOT EXISTS `image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(255) DEFAULT NULL,
    `file_type` VARCHAR(255) DEFAULT NULL,
    `image` LONGBLOB DEFAULT NULL,
    `download_url` VARCHAR(255) DEFAULT NULL,
    `recipe_id` BIGINT DEFAULT NULL UNIQUE,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_image_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Review Table
CREATE TABLE IF NOT EXISTS `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `stars` INT NOT NULL DEFAULT 0,
    `feed_back` VARCHAR(255) DEFAULT NULL,
    `recipe_id` BIGINT DEFAULT NULL,
    `user_id` BIGINT DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_review_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Likes Table
CREATE TABLE IF NOT EXISTS `likes` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `recipe_id` BIGINT DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_likes_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- Sample Seed Data (Password for default users is: password123)
-- BCrypt: $2a$10$vI8aWBnW3fID.ZQ4/ZO1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYeq
-- ========================================================

INSERT INTO `user` (`id`, `username`, `email`, `password`, `full_name`, `role`) VALUES
(1, 'chef_john', 'john@recipehub.com', '$2a$10$vI8aWBnW3fID.ZQ4/ZO1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYeq', 'Chef John Doe', 'ROLE_USER'),
(2, 'sarah_bakes', 'sarah@recipehub.com', '$2a$10$vI8aWBnW3fID.ZQ4/ZO1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYeq', 'Sarah Jenkins', 'ROLE_USER');

-- Insert Sample Recipe
INSERT INTO `recipe` (`id`, `title`, `description`, `instruction`, `category`, `cuisine`, `prep_time`, `cook_time`, `like_count`, `average_rating`, `total_rate_count`, `user_id`) VALUES
(1, 'Classic Spaghetti Carbonara', 'Creamy authentic Italian pasta dish with pancetta and parmesan.', '1. Boil pasta in salted water.\n2. Fry pancetta until crisp.\n3. Whisk eggs and grated parmesan.\n4. Combine pasta with pancetta, remove from heat, and mix in egg mixture quickly.\n5. Season with black pepper and serve.', 'Dinner', 'Italian', '10 mins', '15 mins', 1, 5.0, 1, 1);

-- Insert Ingredients for Recipe 1
INSERT INTO `recipe_ingredients` (`recipe_id`, `ingredient`) VALUES
(1, '200g Spaghetti'),
(1, '100g Pancetta or Guanciale'),
(1, '2 Large Eggs'),
(1, '50g Pecorino Romano or Parmesan Cheese'),
(1, 'Freshly ground Black Pepper'),
(1, 'Salt to taste');

-- Insert Sample Review
INSERT INTO `review` (`id`, `stars`, `feed_back`, `recipe_id`, `user_id`) VALUES
(1, 5, 'Turned out absolutely delicious and authentic!', 1, 2);

-- Insert Sample Like
INSERT INTO `likes` (`id`, `recipe_id`) VALUES
(1, 1);

