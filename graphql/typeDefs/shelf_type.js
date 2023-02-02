const { gql } = require("apollo-server");
//araç özellik özellik2 oem no, orjinal no, raf no
module.exports = gql`

type Shelf {
    _id: String
    raf_no: String
    #structure_id: String
    #bina_no: String
    active: Boolean
    created_at: String
    updated_at: String
}

input createShelfInput {
    raf_no: String
    #structure_id: String
}

input updateShelfInput {
    _id: String!
    raf_no: String
    #structure_id: String
}

input getShelfInput {
    _id: String  
}

type Query {
    getAllShelfs: [Shelf]
    getShelf(input: getShelfInput!): Shelf
}

type Mutation {
    createShelf(input: createShelfInput!): Shelf
    updateShelf(input: updateShelfInput!): Shelf
    deleteShelf(input: getShelfInput!): Shelf
}
`;
