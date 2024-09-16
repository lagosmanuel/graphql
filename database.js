const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

// Define el modelo de Personaje
const Personaje = sequelize.define('Personaje', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pelicula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincroniza la base de datos
sequelize.sync();

module.exports = { sequelize, Personaje };
