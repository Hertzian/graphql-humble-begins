//import { GraphQLServer } from 'graphql-yoga'
const { GraphQLServer } = require('graphql-yoga')
//datatypes for graphql
//strings, booleans, int, float, ID -> to use in unique identifiers

//type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

//resolvers
const resolvers = {
  Query: {
    hello: () => 'My first query',
    id: () => 'asdf1234',
    name: () => 'Lalitus',
    age: () => '38',
    employed: () => true,
    gpa: () => null,
    me: () => {
      return {
        id: 'asdflkj',
        name: 'lalo',
        email: 'cawn@email.com',
        age: '23'
      }
    },
    post: () => {
      return {
        id: 'dsñflkj234',
        title: 'this is a post',
        body: 'this is the body',
        published: true
      }
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log(`The server is up in http://localhost:4000`))
