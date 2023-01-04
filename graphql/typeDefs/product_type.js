const { gql } = require('apollo-server')

module.exports = gql`

type Product {
    _id: String
    name: String
    active: Boolean
    created_at: String
    updated_at: String
}

input createInput {
    name: String!
}

type Query {
    getAllProduct: [Product]
}

type Mutation {
    createProduct(input: createInput!): Product
}
`