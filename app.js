const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schemas/index');
const { rootResolver, rootAuthResolver } = require('./graphql/resolvers/index');
const app = express();
const auth = require('./middlewares/auth').user;

require('./config/firebase')();
app.use(bodyParser.json());

app.use('/api', graphqlHttp({
    schema: graphQlSchema,
    rootValue: rootResolver,
    graphiql: process.env.ALLOW_GRAPHIQL,
}));

app.use('/authApi', auth, graphqlHttp({
    schema: graphQlSchema,
    rootValue: rootAuthResolver,
    graphiql: process.env.ALLOW_GRAPHIQL,
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m3te8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})