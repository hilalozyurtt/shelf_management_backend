const { gql } = require('apollo-server')
module.exports = gql`
  type Structure {
    _id: String
    bina_no: String
    active: Boolean
    created_at: String
    updated_at: String
  }
  input getStructureInput {
    _id: String
  }

  input createStructureInput {
    bina_no: String!
  }
  input updateStructureInput {
    _id: String!
    bina_no: String!
  }
  input deleteStructureInput {
    _id: String!
  }

  type Query {
    getStructure(input: getStructureInput!): Structure
    getAllStructures: [Structure]
  }

  type Query {
    createStructure(input: createStructureInput!): Structure
    updateStructure(input: updateStructureInput!): Structure
    deleteStructure(input: deleteStructureInput!): Structure
  }
`