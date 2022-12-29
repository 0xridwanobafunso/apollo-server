const { ApolloServer, ApolloError, gql } = require('apollo-server')
const { GraphQLScalarType, Kind } = require('graphql')

const oldScalar = new GraphQLScalarType({
  name: 'Odd',
  description: '',
  parseValue: (value) => {
    return value % 2 === 1 ? value : null
  },
  serialize: (value) => {
    return value % 2 === 1 ? value : null
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return oddValue(parseInt(ast.value, 10))
    }
    return null
  },
})

const myDateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'My date scalar type',
  parseValue: (value) => {
    return value // value from the client
  },
  serialize: (value) => {
    //return new Date(Number(value))
    return new Date(value) // value sent to the client
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null
  },
})

const users = [
  {
    id: 1,
    name: 'Adebayo',
    created_at: '2020-05-15 11:29:55',
  },
]

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar Odd
  scalar Date

  type Query {
    users: [User]
    odd: Odd!
  }

  type Mutation {
    "**dfgfd** [API](http://example.com)"
    addUser(obj: addUserInput!): UserWithMutationResponse
  }

  type User {
    id: ID!
    name: String!
    created_at: Date!
  }

  input addUserInput {
    name: String!
  }

  interface MutationResponse {
    success: Boolean!
    message: String
    code: Int!
  }

  type UserWithMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
    user: User
    code: Int!
  }

  enum AllowedColors {
    RED
    GREEN
    PURPLE
  }
`

const resolvers = {
  Odd: oldScalar,
  Date: myDateScalar,
  MutationResponse: {
    __resolveType: (response, context, info) => {
      if (response.user) {
        return 'UserWithMutationResponse'
      }

      // if (response.user) {
      //   return 'UserWithMutationResponse'
      // }
      return null
    },
  },
  AllowedColors: {
    RED: 'red',
    GREEN: 'green',
    PURPLE: 'purple',
  },
  Query: {
    users: () => {
      // throw new ApolloError(
      //   'Name for character with ID 1002 could not be fetched.',
      //   '400'
      // )

      return users
    },
    odd: () => 2,
  },
  Mutation: {
    addUser: (_, { obj }, context, info) => {
      const nextID = users.length + 1
      const user = {
        id: nextID,
        name: obj.name,
        created_at: `${new Date()}`,
        // created_at: new Date().getTime(),
      }
      users.push(user)

      return { success: true, message: 'Added successfully', user, code: 200 }
    },
  },
}

// fieldName: (parent, args, context, info) => data;
// E.g launche: (_, { id, age }, { dataSource }) => { }
/**
 * Query: { }
 * Mutation: { }
 */
/**
 * mutation addUser($obj: addUserInput!) {
     addUser(obj: $obj) {
       id,
       name,
       created_at
     }
   } 

   {
    "obj": {
        "name": "Obafunso Adebayo"
    }
   }
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
})

server.listen().then(({ url }) => {
  console.log(`Graph server running at ${url}`)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.stop()
})
