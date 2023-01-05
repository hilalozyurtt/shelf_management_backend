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
    room_id: String
    active: Boolean
    created_at: String
    updated_at: String
}

input createInput {
    arac: String!
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    raf_no: Int
    room_id: String
}

input updateInput {
    _id: String!
    arac: String
    ozellik: String
    ozellik2: String
    oem_no: String
    orjinal_no: String
    raf_no: Int
    room_id: String
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
