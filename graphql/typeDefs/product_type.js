const { gql } = require('apollo-server')

module.exports = gql`

type Product {
    _id: String
    name: String
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    ek_alan_1: String
    ek_alan_2: String
    ek_alan_3: String
    ek_alan_4: String
    active: Boolean
    created_at: String
    updated_at: String
}

input createInput {
    name: String!
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    ek_alan_1: String
    ek_alan_2: String
    ek_alan_3: String
    ek_alan_4: String

}

input updateInput {
    _id: String!
    name: String
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    ek_alan_1: String
    ek_alan_2: String
    ek_alan_3: String
    ek_alan_4: String
}

input getProductInput{
    _id: String!
}
input deleteInput{
    _id: String!
}

input paggingInput{
    started_at: Int
    finished_at: Int
}

type Query {
    getAllProducts: [Product]
    getProduct(input: getProductInput!): Product
}

type Mutation {
    createProduct(input: createInput!): Product
    updateProduct(input: updateInput!): Product
    deleteProduct(input: deleteInput!): Product
}
`