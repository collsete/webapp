-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-06-2020 a las 05:55:09
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pagina_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `idComentario` int(255) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(255) NOT NULL,
  `idLibro` int(255) NOT NULL,
  `contenido` text DEFAULT NULL,
  PRIMARY KEY (`idComentario`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idLibro` (`idLibro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`idComentario`, `idUsuario`, `idLibro`, `contenido`) VALUES
(1, 1, 1, 'spopspsps'),
(2, 1, 1, 'd1321321321');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

DROP TABLE IF EXISTS `libros`;
CREATE TABLE IF NOT EXISTS `libros` (
  `idLibro` int(255) NOT NULL AUTO_INCREMENT,
  `nombreLibro` varchar(255) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `precio` int(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `editorial` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `calificacion` varchar(255) DEFAULT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `stock` int(255) DEFAULT NULL,
  PRIMARY KEY (`idLibro`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`idLibro`, `nombreLibro`, `descripcion`, `precio`, `imagen`, `editorial`, `categoria`, `calificacion`, `autor`, `stock`) VALUES
(1, 'El dia', 'dasdjjasdpoasdoasdaspodas', 6000, 'anillo.jpg', 'editrollrial', 'terror', '1', 'asdas', 0),
(3, 'El medio dia', 'dposadposdoas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas dasdasdas ', 7000, 'potter.jpg', 'editorial', 'terror', '3', 'ddasdas', 400),
(4, 'libroPrueba', 'es un buen libro jejejeje', 7000, '', 'alfaguara', 'terror', '3', 'Miguel Espildora', 500),
(5, 'libroLineaDeAbajo', 'dasdasdsa', 8, NULL, 'sos', 'terror', '2', NULL, 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(255) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(40) DEFAULT NULL,
  `correoUsuario` varchar(255) DEFAULT NULL,
  `contrasenaUsuario` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `logeado` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `correoUsuario`, `contrasenaUsuario`, `direccion`, `logeado`) VALUES
(1, 'Erick Maulen', 'erickwekogmailcom', '1234', 'SAN JUAN', 0),
(2, 'Benjamin Rojas', 'benjaja@gmail.com', '123456', 'VINA DEL MAR', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_libro`
--

DROP TABLE IF EXISTS `usuario_libro`;
CREATE TABLE IF NOT EXISTS `usuario_libro` (
  `idUsuario` int(255) NOT NULL,
  `idLibro` int(255) NOT NULL,
  `cantidad` int(255) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idLibro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario_libro`
--

INSERT INTO `usuario_libro` (`idUsuario`, `idLibro`, `cantidad`) VALUES
(1, 1, 1),
(1, 3, 1),
(1, 4, 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `idLibro` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`),
  ADD CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
