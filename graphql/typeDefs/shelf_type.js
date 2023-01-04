const { gql } = require("apollo-server");
//araç özellik özellik2 oem no, orjinal no, raf no
module.exports = gql`

type Shelf {
    _id: String
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    raf_no: Int
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
    raf_no: Int
}
input getShelfInput {
    _id: String  
}

type Query {
    getAllShelfs: [Shelf]
    getShelf(input: getShelfInput): Shelf
}

type Mutation {
    createShelf(input: createInput!): Shelf
}
`;
