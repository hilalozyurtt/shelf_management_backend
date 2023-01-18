const { makeExecutableSchema } = require('@graphql-tools/schema')

const structureTypeDefs = require('./typeDefs/structure_type')
const structureResolvers = require('./resolvers/structure_resolver')

const shelfTypeDefs = require('./typeDefs/shelf_type')
const shelfResolvers = require('./resolvers/shelf_resolver')

const productTypeDefs = require('./typeDefs/product_type')
const productResolvers = require('./resolvers/product_resolver')

const userTypeDefs = require('./typeDefs/user_type')
const userResolvers = require('./resolvers/user_resolvers')

const schema = makeExecutableSchema({
  typeDefs: [structureTypeDefs, shelfTypeDefs, productTypeDefs, userTypeDefs],
  resolvers: [structureResolvers, shelfResolvers, productResolvers, userResolvers]
})

module.exports = schema