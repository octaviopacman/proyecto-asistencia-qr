-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-04-2024 a las 04:04:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tecnica4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `AsistenciaID` int(11) NOT NULL,
  `ProfesorID` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `HoraLlegada` time DEFAULT NULL,
  `HoraSalida` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`AsistenciaID`, `ProfesorID`, `Fecha`, `HoraLlegada`, `HoraSalida`) VALUES
(6, NULL, '2024-03-24', '08:00:00', '12:00:00'),
(7, NULL, '2024-03-24', '09:00:00', '13:00:00'),
(8, NULL, '2024-03-24', '08:30:00', '12:30:00'),
(9, NULL, '2024-03-24', '10:00:00', '14:00:00'),
(10, NULL, '2024-03-24', '07:45:00', '11:45:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `CursoID` int(11) NOT NULL,
  `Anio` int(11) DEFAULT NULL,
  `Division` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`CursoID`, `Anio`, `Division`) VALUES
(1, 1, 'A'),
(2, 2, 'B'),
(3, 3, 'C'),
(4, 4, 'D'),
(5, 5, 'E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `HorarioID` int(11) NOT NULL,
  `ProfesorID` int(11) DEFAULT NULL,
  `CursoID` int(11) DEFAULT NULL,
  `MateriaID` int(11) DEFAULT NULL,
  `Dia` varchar(10) DEFAULT NULL,
  `Horario` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`HorarioID`, `ProfesorID`, `CursoID`, `MateriaID`, `Dia`, `Horario`) VALUES
(1, 1, 1, 1, 'Lunes', '08:00-09:00'),
(2, 2, 2, 2, 'Lunes', '09:00-10:00'),
(3, 3, 3, 3, 'Lunes', '10:00-11:00'),
(4, 4, 4, 4, 'Lunes', '11:00-12:00'),
(5, 5, 5, 5, 'Lunes', '12:00-13:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `MateriaID` int(11) NOT NULL,
  `NombreMateria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`MateriaID`, `NombreMateria`) VALUES
(1, 'Matemáticas'),
(2, 'Lengua'),
(3, 'Historia'),
(4, 'Geografía'),
(5, 'Biología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `DNI` varchar(10) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Domicilio` varchar(255) DEFAULT NULL,
  `ContrasenaHash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id`, `Nombre`, `Apellido`, `DNI`, `Telefono`, `Correo`, `Domicilio`, `ContrasenaHash`) VALUES
(1, 'Juan', 'Perez', '12345678', '1122334455', 'juan.perez@example.com', 'Calle Falsa 123', 'hash1'),
(2, 'Ana', 'Gomez', '23456789', '1122334466', 'ana.gomez@example.com', 'Avenida Siempreviva 456', 'hash2'),
(3, 'Luis', 'Martinez', '34567890', '1122334477', 'luis.martinez@example.com', 'Ruta 789', 'hash3'),
(4, 'Laura', 'Rodriguez', '45678901', '1122334488', 'laura.rodriguez@example.com', 'Pasaje 101112', 'hash4'),
(5, 'Carlos', 'Lopez', '56789012', '1122334499', 'carlos.lopez@example.com', 'Boulevard 131415', 'hash5');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`AsistenciaID`),
  ADD KEY `ProfesorID` (`ProfesorID`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`CursoID`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`HorarioID`),
  ADD KEY `ProfesorID` (`ProfesorID`),
  ADD KEY `CursoID` (`CursoID`),
  ADD KEY `MateriaID` (`MateriaID`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`MateriaID`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `AsistenciaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `CursoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `HorarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `MateriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`ProfesorID`) REFERENCES `profesores` (`id`);

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`ProfesorID`) REFERENCES `profesores` (`id`),
  ADD CONSTRAINT `horarios_ibfk_2` FOREIGN KEY (`CursoID`) REFERENCES `cursos` (`CursoID`),
  ADD CONSTRAINT `horarios_ibfk_3` FOREIGN KEY (`MateriaID`) REFERENCES `materias` (`MateriaID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
