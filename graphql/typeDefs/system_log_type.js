const { gql } = require('apollo-server')
module.exports = gql`
  type SystemLog {
    _id: String
    user_id: String
    user_name: String
    changed_value: String
    changed_id: String
    action: String
    created_at: String
    updated_at: String
  }
  input getSystemLogInput {
    _id: String
  }

  input createSystemLogInput {
    bina_no: String!
  }

  type Query {
    getSystemLog(input: getSystemLogInput!): SystemLog
    getAllSystemLogs: [SystemLog]
  }

`