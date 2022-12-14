const path = require('path');
const express = require('express');
// const { buildSchema } = require('graphql');
// const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql'],
});

const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer() {
    const app = express();  

    const schema = makeExecutableSchema({
        // typeDefs: [schemaText] //schemaText was originally combination of graphql files
        typeDefs: typesArray,
        resolvers: resolversArray,
    });

    const server = new ApolloServer({
        schema
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(3000, () => {
        console.log('Running GraphQL server...');
    });
}

startApolloServer();

// const schema = buildSchema(`
//     type Query {
//         products: [Product]
//         orders: [Order]
//     }

//     type Product {
//         id: ID!
//         description: String!
//         price: Float!
//         reviews: [Review]
//     }

//     type Review {
//         rating: Int!
//         comment: String
//     }

//     type Order {
//         date: String!
//         subtotal: Float!
//         items: [OrderItem]
//     }

//     type OrderItem {
//         products: Product!
//         quantity: Int!
//     }
// `);

// const root = {
//     description: 'Red Shoe',
//     price: 42.12,s
// };

// const root = {
//     products: require('./products/products.models'),
//     orders: require('./orders/orders.models'),
// }

// const app = express();

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     // rootValue: root,
//     graphiql: true,
// }));

// app.listen(3000, () => {
//     console.log('Running GraphQL server...');
// });