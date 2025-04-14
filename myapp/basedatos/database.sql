CREATE SCHEMA ecommerce;
USE Ecommerce;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(45) UNIQUE,
  username VARCHAR(45) UNIQUE,
  contrasenia VARCHAR(45),
  fecha DATETIME,
  DNI INT,
  foto VARCHAR(45),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuarioId INT,
  imagen VARCHAR(255),
  nombre VARCHAR(100),
  descripcion VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productoId INT,
  usuarioId INT,
  texto VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_comentario_producto FOREIGN KEY (productoId) REFERENCES productos(id),
  CONSTRAINT fk_comentario_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);


INSERT INTO usuarios (username,email, contrasenia, fecha, DNI, foto) VALUES (
DEFAULT, 
'juliszelu','juliszelubski@gmail.com', 'holaa1316', '2005-06-06', 46755985, '/images/users/default-image.png',
'martur','martina.rios@example.com', 'clave1234', '2000-11-22', 40223344, '/images/users/user2.png',
'lucasm','lucas.mendez@example.com', 'holaa1316', '1998-03-14', 39555123, '/images/users/user3.png',
'camip','camila.paz@example.com', 'holaa1316', '2003-07-09', 42333111, '/images/users/user4.png',
'tomig','tomas.gomez@example.com', 'holaa1316', '1995-12-01', 38777666, '/images/users/user5.png'
);


INSERT INTO productos (usuarioId, imagen, nombre, descripcion) VALUES(
DEFAULT,
1, '/images/products/1.png', 'Silla Premier', 'Silla de madera multilaminada, asiento y respaldo acolchados en ecocuero.',
1, '/images/products/2.png', 'Silla Circular', 'Sillón circular, asiento curvado, acolchado en eco cuero.',
1, '/images/products/3.png', 'Silla Ruby', 'Cómoda silla de mesa o de oficina.',
1, '/images/products/4.png', 'Silla Danna', 'Curvatura suave, asiento acolchado y respaldo cómodo.',
1, '/images/products/5.png', 'Silla Madison', 'Estilo moderno con toques vintage.',
1, '/images/products/6.png', 'Silla Emma', 'Madera y tela, diseño ergonómico.',
1, '/images/products/7.png', 'Silla Miller', 'Estructura de madera, estilo y funcionalidad.',
1, '/images/products/8.png', 'Silla Maite', 'Su diseño se adapta a todos los ambientes,combiando la calidez de la madera y el confort del tapizado con un estilo clásico y sofisticado.',
1, '/images/products/9.png', 'Silla Chiara', 'Su asiento en forma de cubo y tapizado en tela,aporta un toque acogedor a tu espacio.Las patas dan un aire ligero y moderno.',
1, '/images/products/10.png', 'Silla Eames', 'Asiento de polipropileno, base de madera y soportes de hierro.'
);


INSERT INTO comentarios (productoId, usuarioId, texto) VALUES(
DEFAULT, 
1, 1, 'Muy buena calidad',
2, 2, 'Se me rompió al día siguiente',
3, 3, 'No es igual a las fotos',
4, 4, 'No me gustó',
5, 5, 'Muy buen diseño',
6, 1, 'Estética pero no práctica',
7, 2, 'No es tan alta',
8, 3, 'Cumplió mis expectativas',
9, 4, 'Muy cómoda',
10, 5, 'Básica pero sirve'
);