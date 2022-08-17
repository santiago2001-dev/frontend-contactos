-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3308
-- Generation Time: Aug 17, 2022 at 12:04 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contactos`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactos`
--

CREATE TABLE `contactos` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nameuser` varchar(10) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `number` varchar(10) NOT NULL,
  `proyecto` varchar(50) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contactos`
--

INSERT INTO `contactos` (`id`, `name`, `lastname`, `email`, `nameuser`, `cargo`, `area`, `number`, `proyecto`, `img`) VALUES
(6, 'santiago', 'morales', 'vmorales@ita-sa.com', 'vmorales', 'Auxiliar de Infraestructura', 'Área Administrativa | TIC (Ingeniería)', '3174310329', 'bogota', 'http://res.cloudinary.com/decsantg/image/upload/v1659664146/fxposkhbzz3kacvxe8ch.png'),
(7, 'yesid ', 'preciado', 'ypreciado@gmail.com', 'ypreciado', 'Presidencia', ' Dirección Administrativa', '3223445030', 'bogota', 'http://res.cloudinary.com/decsantg/image/upload/v1660055335/pulww4v1rywiciom8dvr.jpg'),
(8, 'camilo ', 'pineda', 'cpineda@ita-sa.com', 'cpineda', 'Contador', ' Dirección Administrativa', '3043785840', 'bogota', 'http://res.cloudinary.com/decsantg/image/upload/v1660685123/wfjcwnwbd4m38wqdomsw.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `enlaces`
--

CREATE TABLE `enlaces` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `enlace` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `enlaces`
--

INSERT INTO `enlaces` (`id`, `nombre`, `enlace`, `img`) VALUES
(2, 'cuenta', 'https://ita-sa.com.co/cuenta', 'http://res.cloudinary.com/decsantg/image/upload/v1660693158/po5accwo8snzuupyoeia.jpg'),
(3, 'entregadeactvios', 'https://ita-sa.com.co/entregadeactivos', 'http://res.cloudinary.com/decsantg/image/upload/v1660693205/emeuideytzrpbxm9mvyq.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` varchar(10) NOT NULL,
  `img` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`, `role`, `img`) VALUES
(22, 'admin', 'admin', 'admin2022@ita-sa.com', '$2a$08$PQs/aNJlFyXRz3OWrBtNEuvs4u5bpk8y.heFurbPX83.Q17bYauzW', 'admin', 'http://res.cloudinary.com/decsantg/image/upload/v1660054544/ckb4gghk6f0wafcobsls.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enlaces`
--
ALTER TABLE `enlaces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `enlaces`
--
ALTER TABLE `enlaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
