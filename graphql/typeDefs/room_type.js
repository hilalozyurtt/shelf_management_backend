const { gql } = require('apollo-server')
module.exports = gql`
  type Room {
    _id: String
    oda_no: String
    structure_id: String
    active: Boolean
    created_at: String
    updated_at: String
  }
  input getRoomInput {
    _id: String
  }

  input createRoomInput {
    oda_no: String!
    structure_id: String!
  }
  input updateRoomInput {
    _id: String!
    oda_no: String!
    structure_id: String!
  }
  input deleteRoomInput {
    _id: String!
  }

  type Query {
    getRoom(input: getRoomInput!): Room
    getAllRoom: [Room]
  }

  type Query {
    createRoom(input: createRoomInput!): Room
    updateRoom(input: updateRoomInput!): Room
    deleteRoom(input: deleteRoomInput!): Room
  }
`