-- Database Setup Script untuk Day 3 Project
-- Jalankan script ini di MySQL untuk membuat database

-- Buat database
CREATE DATABASE IF NOT EXISTS day3_db;

-- Gunakan database
USE day3_db;

-- Catatan: Tabel akan otomatis dibuat oleh Sequelize saat pertama kali menjalankan server
-- dengan menggunakan sequelize.sync() di models/index.js

-- Jika ingin membuat tabel secara manual, gunakan script di bawah ini:

-- Tabel Users
CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER NOT NULL auto_increment,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- Tabel Posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INTEGER NOT NULL auto_increment,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `userId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- Tabel Comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` INTEGER NOT NULL auto_increment,
  `content` TEXT NOT NULL,
  `postId` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- Tabel Products
CREATE TABLE IF NOT EXISTS `products` (
  `id` INTEGER NOT NULL auto_increment,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `stock` INTEGER NOT NULL DEFAULT 0,
  `category` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

