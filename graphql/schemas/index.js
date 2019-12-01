const { buildSchema } = require('graphql');
const path = require('path')
const mergeGraphqlSchemas = require('merge-graphql-schemas')
const fileLoader = mergeGraphqlSchemas.fileLoader
const mergeTypes = mergeGraphqlSchemas.mergeTypes
 
const typesArray = fileLoader(path.join(__dirname, '.'), { recursive: true })

const schema = mergeTypes(typesArray, { all: true });
module.exports = buildSchema(schema);