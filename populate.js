const { sequelize, Personaje } = require('./database'); // Importa la configuración de la base de datos

// Define los datos de ejemplo
const personajes = [
  { nombre: 'Luke Skywalker', pelicula: 'Star Wars' },
  { nombre: 'Darth Vader', pelicula: 'Star Wars' },
  { nombre: 'Iron Man', pelicula: 'Iron Man' },
  { nombre: 'Thor', pelicula: 'Thor' },
  { nombre: 'Harry Potter', pelicula: 'Harry Potter and the Sorcerer\'s Stone' },
  { nombre: 'Hermione Granger', pelicula: 'Harry Potter and the Sorcerer\'s Stone' },
];

// Función para poblar la base de datos
const populateDatabase = async () => {
  try {
    // Conecta a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    // Sincroniza la base de datos (asegúrate de que el modelo está actualizado)
    await sequelize.sync();

    // Elimina todos los registros existentes (opcional)
    await Personaje.destroy({ where: {} });
    console.log('Registros anteriores eliminados.');

    // Añade los personajes
    for (const personaje of personajes) {
      await Personaje.create(personaje);
    }

    console.log('Base de datos poblada con éxito.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    // Cierra la conexión a la base de datos
    await sequelize.close();
  }
};

// Ejecuta la función de poblamiento
populateDatabase();
