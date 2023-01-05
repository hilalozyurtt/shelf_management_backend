const { makeExecutableSchema } = require('@graphql-tools/schema')

const structureTypeDefs = require('./typeDefs/structure_type')
const structureResolvers = require('./resolvers/structure_resolver')

const productTypeDefs = require('./typeDefs/product_type')
const productResolvers = require('./resolvers/product_resolver')

const schema = makeExecutableSchema({
  typeDefs: [structureTypeDefs, productTypeDefs],
  resolvers: [structureResolvers, productResolvers]
})

module.exports = schema