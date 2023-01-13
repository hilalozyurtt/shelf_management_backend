const { gql } = require('apollo-server')

module.exports = gql`

type Product {
    _id: String
    shelf_id: String
    name: String
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    active: Boolean
    created_at: String
    updated_at: String
}

input createProductInput {
    name: String!
    shelf_id: String!
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String

}

input updateProductInput {
    _id: String!
    shelf_id: String!
    name: String
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String

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

input getProductsOfShelfInput{
    shelf_id: String!
    started_at: Int
    finished_at: Int
}

input getProductOfStructureInput{
    structure_id: String!
    started_at: Int
    finished_at: Int
}

type Query {
    getAllProducts: [Product]
    getProduct(input: getProductInput!): Product
    getProductsOfShelf(input: getProductsOfShelfInput!): [Product]
    getProductsOfStructure(input: getProductOfStructureInput!): [Product]
}

type Mutation {
    createProduct(input: createProductInput!): Product
    updateProduct(input: updateProductInput!): Product
    deleteProduct(input: deleteInput!): Product
}
`