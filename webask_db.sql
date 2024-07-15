-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 12 juil. 2024 à 16:53
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `webask_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `picture` int(11) DEFAULT NULL,
  `likes` int(11) DEFAULT '0',
  `related_comment` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `related_comment` (`related_comment`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `author`, `description`, `created_at`, `updated_at`, `picture`, `likes`, `related_comment`) VALUES
(1, 'Bonjour', 'Ceci est une descriptsion ddfvfdve test', '2024-07-08 20:51:22', '2024-07-11 00:47:57', 1, 27, NULL),
(41, 'Author', 'Comment', '2024-07-10 22:03:01', NULL, NULL, 2, NULL),
(42, 'Test 1', 'Comment 1', '2024-07-10 22:03:09', NULL, NULL, 0, NULL),
(43, 'Test 1 Reply', 'Comment 1 Reply', '2024-07-10 22:03:31', NULL, NULL, 5, 42),
(53, 'Author2', 'Comment2', '2024-07-11 00:37:46', '2024-07-12 17:29:05', NULL, 0, 41),
(55, 'Bonjour', 'Ceci est une descriptsion ddfvfdve test', '2024-07-11 00:48:00', NULL, NULL, 5, 1),
(78, 'Author ?', 'Comment ?', '2024-07-12 18:36:33', NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
CREATE TABLE IF NOT EXISTS `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `related_comment` FOREIGN KEY (`related_comment`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
