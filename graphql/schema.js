const { makeExecutableSchema } = require('@graphql-tools/schema')

const productTypeDefs = require('./typeDefs/product_type')
const productResolvers = require('./resolvers/product_resolver')

const schema = makeExecutableSchema({
  typeDefs: [productTypeDefs],
  resolvers: [productResolvers]
})

module.exports = schema