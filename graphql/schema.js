const { makeExecutableSchema } = require('@graphql-tools/schema')
/*
const structureTypeDefs = require('./typeDefs/structure_type')
const structureResolvers = require('./resolvers/structure_resolver')
*/
const shelfTypeDefs = require('./typeDefs/shelf_type')
const shelfResolvers = require('./resolvers/shelf_resolver')

const productTypeDefs = require('./typeDefs/product_type')
const productResolvers = require('./resolvers/product_resolver')

const userTypeDefs = require('./typeDefs/user_type')
const userResolvers = require('./resolvers/user_resolvers')

const systemLogTypeDefs = require('./typeDefs/system_log_type')
const systemLogResolvers = require('./resolvers/system_log_resolver')

const systemParamsTypeDefs = require('./typeDefs/system_params')
const systemParamsResolvers = require('./resolvers/system_params_resolver')

const schema = makeExecutableSchema({
  typeDefs: [shelfTypeDefs, productTypeDefs, userTypeDefs, systemLogTypeDefs, systemParamsTypeDefs],
  resolvers: [shelfResolvers, productResolvers, userResolvers, systemLogResolvers, systemParamsResolvers]
})

module.exports = schema