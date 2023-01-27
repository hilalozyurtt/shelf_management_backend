const { gql } = require("apollo-server");

module.exports = gql`
  type SystemParams {
    _id: String
    key: String
    value: Boolean
    variable: String
    active: Boolean
    created_at: String
    updated_at: String
  }

  input getSystemParamsInput {
    _id: String!
  }
  input createSystemParamsInput {
    key: String!
    value: Boolean!
    variable: String!
  }

  input updateSystemParamsInput {
    _id: String!
    value: Boolean!
    variable: String!
  }

  type Query {
    getAllSystemParams: [SystemParams]
    getSystemParams(input: getSystemParamsInput): SystemParams
  }

  type Mutation {
    createSystemParams(input: createSystemParamsInput): SystemParams
    deleteSystemParams(input: getSystemParamsInput): SystemParams
    updateSystemParams(input: updateSystemParamsInput): SystemParams
  }
`;
