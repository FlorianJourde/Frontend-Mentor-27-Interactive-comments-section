-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 17 juil. 2024 à 19:53
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
  `likes` int(11) DEFAULT '0',
  `related_comment` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `avatar_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `related_comment` (`related_comment`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `author`, `description`, `created_at`, `updated_at`, `likes`, `related_comment`, `session_id`, `avatar_id`) VALUES
(1, 'Bonjourddteee', 'Ceci est une descriptsion ddfvfdve tesdfvdfvdfv(((((((((((((((((((dfvtste', '2024-07-08 20:51:22', '2024-07-17 21:34:18', 79, NULL, 'lynfv5p50.h67qbaehqvu', 1),
(41, 'Author', 'Comment', '2024-07-10 22:03:01', NULL, 11, NULL, NULL, 1),
(55, 'Bonjourd', 'Ceci est une descriptsion ddfvfdve test', '2024-07-11 00:48:00', '2024-07-15 21:28:04', 56, 1, NULL, 1),
(104, '??!', '!!!', '2024-07-15 23:58:42', NULL, 12, 1, 'lynj08780.evsh83ftk5s', 19),
(113, 'Celà marche-til ?', '???!!!!', '2024-07-16 22:13:47', '2024-07-17 00:06:27', 2, 1, 'lyoupk880.873bmbknhu2', 11),
(121, '11111', '22222', '2024-07-16 23:38:58', '2024-07-17 00:48:47', 0, 1, 'lynfv5p50.h67qbaehqvu', 20),
(171, '??', '!!!', '2024-07-17 00:05:22', NULL, 0, 41, 'lynfv5p50.h67qbaehqvu', 8),
(175, 'Autrice', 'Commentatrice', '2024-07-17 00:06:39', '2024-07-17 00:06:46', 0, NULL, 'lyoupk880.873bmbknhu2', 18),
(176, '', '', '2024-07-17 00:15:00', NULL, 1, 1, 'lynfv5p50.h67qbaehqvu', 1),
(221, '!!!!!aaaaaaa', '!!!!!!aaaaa', '2024-07-17 01:08:37', '2024-07-17 01:09:04', 0, 41, 'lyp0yize0.ukc7zawwrc', 10),
(222, '', '', '2024-07-17 01:09:14', NULL, 0, 1, 'lyp0yize0.ukc7zawwrc', 11),
(256, 'sdcsd', 'sdcsdc', '2024-07-17 19:34:28', NULL, 0, 1, 'lynfv5p50.h67qbaehqvu', 1),
(259, 'cc VVVV', 'cc VVVVcc VVVVcc VVVVcc VVVVcc VVVV', '2024-07-17 19:36:36', '2024-07-17 20:02:30', 0, 1, 'lynfv5p50.h67qbaehqvu', 11),
(260, '43435', '4353454', '2024-07-17 19:36:41', '2024-07-17 20:02:19', 1, 1, 'lynfv5p50.h67qbaehqvu', 11),
(267, 'dscdsc', 'sdcsdc', '2024-07-17 20:10:33', '2024-07-17 20:10:37', 0, NULL, 'lynfv5p50.h67qbaehqvu', 7),
(268, 'Auteur', 'Comment', '2024-07-17 20:15:34', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 1),
(269, 'dvd', 'dfvfv', '2024-07-17 20:15:45', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 13),
(270, '??', '!!!', '2024-07-17 20:25:20', NULL, 0, 1, 'lynfv5p50.h67qbaehqvu', 19),
(271, 'Hey !', 'C\'est moi !', '2024-07-17 20:25:38', NULL, 1, 1, 'lynfv5p50.h67qbaehqvu', 8),
(272, 'test', 'test', '2024-07-17 20:40:29', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 1),
(273, '???', '????!!!', '2024-07-17 20:41:12', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 1),
(278, '!!!', '!!!!!', '2024-07-17 20:49:25', '2024-07-17 20:49:34', 0, NULL, 'lynfv5p50.h67qbaehqvu', 16),
(279, 'Try', 'Comment', '2024-07-17 21:02:13', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 1),
(280, 'Test', 'Commennnnnttt', '2024-07-17 21:08:52', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 10),
(281, 'dfvdf', 'dfvfv', '2024-07-17 21:09:01', NULL, 0, NULL, 'lynfv5p50.h67qbaehqvu', 13);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `related_comment` FOREIGN KEY (`related_comment`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
