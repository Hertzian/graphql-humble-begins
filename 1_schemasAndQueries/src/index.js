//import { GraphQLServer } from 'graphql-yoga'
const { GraphQLServer } = require('graphql-yoga')
//datatypes for graphql
//strings, booleans, int, float, ID -> to use in unique identifiers

//Demo user data
const users = [
  {
    id: '1',
    name: 'Lalo',
    email: 'lalo@gmail.com',
    age: 39
  }, {
    id: '2',
    name: 'Sara',
    email: 'sara@gmail.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@gmail.com',
  }
]
const posts = [
  {
    id: "1",
    title: 'hello1',
    body: 'sample1',
    published: true
  },
  {
    id: "2",
    title: 'hello2',
    body: 'sample2',
    published: false
  },
  {
    id: "3",
    title: 'hello3',
    body: 'sample3',
    published: true
  }
]

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
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
    addPlus(numbers: [Float!]!): Float!
    grades: [Int!]!
    users(query: String): [User!]!
    postsQuery(query: String): [Post!]!
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
    },
    greeting: (parent, args, ctx, info) => {
      console.log(args)
      if (args.name && args.position)
        return `Hi ${args.name}, how are you!, and I am ${args.position}`
      return `Hi nobody`
    },
    add: (parent, args, ctx, info) => {
      const { a, b } = args
      if (a && b) return a + b
    },
    addPlus: (parent, args, ctx, info) => {
      if (args.numbers.length === 0) return 0
      return args.numbers.reduce((accumulator, current) => accumulator + current)
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93]
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users
      return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    postsQuery(parent, args, ctx, info) {
      if (!args.query) return posts
      return posts.filter((post) => {
        return post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) || post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      })
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log(`The server is up in http://localhost:4000`))
