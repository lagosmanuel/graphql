const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Habilita la interfaz GraphiQL
}));

app.listen(port, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${port}/graphql`);
});

