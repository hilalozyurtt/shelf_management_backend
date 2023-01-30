const { gql } = require("apollo-server");

module.exports = gql`
  type SystemParams {
    _id: String
    key: String
    value: Boolean
    variable: String
    active: Boolean
    table: String
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
    table: String!
  }

  input updateSystemParamsInput {
    _id: String!
    value: Boolean!
  }

  input getSystemParamsByValueInput{
    variable: String!
  }

  input getSystemParamsByTableInput{
    table: String!
  }

  type Query {
    getAllSystemParams: [SystemParams]
    getSystemParams(input: getSystemParamsInput): SystemParams
    getSystemParamsByValue(input: getSystemParamsByValueInput ): SystemParams
    getSystemParamsByTable(input: getSystemParamsByTableInput): [SystemParams]
  }

  type Mutation {
    createSystemParams(input: createSystemParamsInput): SystemParams
    deleteSystemParams(input: getSystemParamsInput): SystemParams
    updateSystemParams(input: updateSystemParamsInput): SystemParams
  }
`;
