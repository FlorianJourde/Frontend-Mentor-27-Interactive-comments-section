-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 17 juil. 2024 à 22:50
-- Version du serveur : 10.11.8-MariaDB-cll-lve
-- Version de PHP : 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `u718790758_webask_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `related_comment` int(11) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `avatar_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `author`, `description`, `created_at`, `updated_at`, `likes`, `related_comment`, `session_id`, `avatar_id`) VALUES
(288, 'SQLMaster42', 'Je rencontre des performances lentes avec mes requêtes SQL. Comment puis-je optimiser une requête SELECT complexe pour améliorer les temps de réponse ?', '2024-07-17 22:35:54', NULL, 2, NULL, 'lyqebe2k0.w1mclup141o', 16),
(289, 'IndexGuru', 'Assurez-vous d\'indexer correctement les colonnes utilisées dans les clauses WHERE et JOIN pour réduire le temps de recherche.', '2024-07-17 22:37:17', NULL, 1, 288, 'lyqf8k0w0.i4krbuqmmr', 22),
(290, 'QueryAnalyzer', 'Utilisez EXPLAIN pour analyser l\'exécution de la requête et identifier les points d\'amélioration.', '2024-07-17 22:37:35', NULL, 0, 288, 'lyqf8k0w0.i4krbuqmmr', 21),
(291, 'SubQuerySensei', 'Divisez les requêtes complexes en sous-requêtes ou utilisez des vues matérialisées pour pré-calculer les résultats.', '2024-07-17 22:39:43', NULL, 2, 288, 'lyqf8k0w0.i4krbuqmmr', 2),
(292, 'NextJSNinja', 'Je débute avec Next.js et je veux comprendre la différence entre getStaticProps et getServerSideProps. Quand devrais-je utiliser l\'un plutôt que l\'autre ?', '2024-07-17 22:39:59', NULL, 0, NULL, 'lyqf8k0w0.i4krbuqmmr', 4),
(293, 'StaticSage', 'getStaticProps est idéal pour le pré-rendu statique lorsqu\'une page ne dépend pas de données en temps réel.', '2024-07-17 22:40:55', NULL, 2, 292, 'lyqebe2k0.w1mclup141o', 5),
(295, 'ServerSideSamurai', 'getServerSideProps est utile pour le rendu côté serveur lorsque vous avez besoin de données dynamiques à chaque demande.', '2024-07-17 22:41:19', '2024-07-17 22:41:54', 0, 292, 'lyqebe2k0.w1mclup141o', 8),
(298, 'WebDevExplorer', 'Je rencontre des problèmes de mise en page avec CSS Grid. Comment puis-je aligner correctement mes éléments sur une grille complexe ?', '2024-07-17 22:43:54', NULL, 1, NULL, 'lyqebe2k0.w1mclup141o', 11),
(299, 'FlexFox', 'Explorez les fractions de grille, les zones nommées et les propriétés minmax().', '2024-07-17 22:44:18', NULL, 1, 298, 'lyqf8k0w0.i4krbuqmmr', 12),
(300, 'DeployDev', 'Comment déployer une application Node.js sur un serveur VPS ?', '2024-07-17 22:45:03', NULL, 1, NULL, 'lyqf8k0w0.i4krbuqmmr', 23),
(301, 'ServerSage', 'Utilisez un service comme DigitalOcean pour créer et configurer votre serveur VPS.', '2024-07-17 22:45:36', NULL, 0, 300, 'lyqebe2k0.w1mclup141o', 24),
(302, 'DeployDruid', 'Installez Node.js et configurez un reverse proxy avec Nginx pour gérer les requêtes.', '2024-07-17 22:46:00', NULL, 0, 300, 'lyqebe2k0.w1mclup141o', 6);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `related_comment` (`related_comment`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

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
