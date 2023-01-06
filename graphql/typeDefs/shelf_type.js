const { gql } = require("apollo-server");
//araç özellik özellik2 oem no, orjinal no, raf no
module.exports = gql`

type Shelf {
    _id: String
    raf_no: String
    room_no: String
    structure_no: String
    active: Boolean
    created_at: String
    updated_at: String
}

input createInput {
    raf_no: String
    room_no: String
    structure_no: String
}

input updateInput {
    _id: String!
    raf_no: String
    room_no: String
    structure_no: String
}

input getShelfInput {
    _id: String  
}

type Query {
    getAllShelfs: [Shelf]
    getShelf(input: getShelfInput!): Shelf
}

type Mutation {
    createShelf(input: createInput!): Shelf
    updateShelf(input: updateInput!): Shelf
    deleteShelf(input: getShelfInput!): Shelf
}
`;
