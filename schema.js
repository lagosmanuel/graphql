const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const { Personaje } = require('./database');

// Definir el tipo de Personaje
const PersonajeType = new GraphQLObjectType({
  name: 'Personaje',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    pelicula: { type: GraphQLString },
  }),
});

// Definir el Query Type
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    personajes: {
      type: new GraphQLList(PersonajeType),
      resolve: async () => await Personaje.findAll(),
    },
    personaje: {
      type: PersonajeType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => await Personaje.findByPk(args.id),
    },
  },
});

// Definir el Mutation Type
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPersonaje: {
      type: PersonajeType,
      args: {
        nombre: { type: GraphQLString },
        pelicula: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Personaje.create({
          nombre: args.nombre,
          pelicula: args.pelicula,
        });
      },
    },
    updatePersonaje: {
      type: PersonajeType,
      args: {
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        pelicula: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const personaje = await Personaje.findByPk(args.id);
        if (personaje) {
          personaje.nombre = args.nombre || personaje.nombre;
          personaje.pelicula = args.pelicula || personaje.pelicula;
          await personaje.save();
        }
        return personaje;
      },
    },
    deletePersonaje: {
      type: PersonajeType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const personaje = await Personaje.findByPk(args.id);
        if (personaje) {
          await personaje.destroy();
        }
        return personaje;
      },
    },
  },
});

// Crear el esquema GraphQL
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = schema;

