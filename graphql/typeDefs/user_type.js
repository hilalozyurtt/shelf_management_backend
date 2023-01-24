const { gql } = require('apollo-server');

module.exports = gql`
type User {
    _id: String
    username: String
    usersurname: String
    phone: String
    role: String
    password: String
    token: String
}

input RegisterInput{
    username: String!
    usersurname: String!
    phone: String
    role: String
    password: String!
    confirmPassword: String!
}

input UpdateStInput{
    _id: String!
    username: String!
    usersurname: String!
    phone: String
}

input LoginInput{
    username: String!
    password: String!
}

input getUserInput {
    _id: String!
}

type Query {
    user(input: getUserInput!): User
    logout: String
    checkToken: User
}

type Mutation {
    registerUser(input: RegisterInput): User
    loginUser(input: LoginInput): User
    updateUser(input: UpdateStInput): User
}
`