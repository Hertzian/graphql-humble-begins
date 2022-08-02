//import { GraphQLServer } from 'graphql-yoga'
const { GraphQLServer } = require('graphql-yoga')
//datatypes for graphql
//strings, booleans, int, float, ID -> to use in unique identifiers

//Demo user data
const users = [
  { id: '1', name: 'Lalo', email: 'lalo@gmail.com', age: 39 },
  { id: '2', name: 'Sara', email: 'sara@gmail.com', },
  { id: '3', name: 'Mike', email: 'mike@gmail.com', }
]
const posts = [
  { id: "4", title: 'hello1', body: 'sample1', published: true, author: '1' },
  { id: "5", title: 'hello2', body: 'sample2', published: false, author: '2' },
  { id: "6", title: 'hello3', body: 'sample3', published: true, author: '3' }
]

const comments = [
  { id: '7', text: 'lorem10' },
  { id: '8', text: 'lorem20' },
  { id: '9', text: 'lorem30' },
  { id: '10', text: 'lorem40' },
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
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comments]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
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
    },
    comments(parent, args, ctx, info) {
      return comments
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id)
    },
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log(`The server is up in http://localhost:4000`))
