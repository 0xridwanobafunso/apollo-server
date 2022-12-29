const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql')

const users = [
  {
    id: 1,
    name: 'Obafunso',
  },
  {
    id: 2,
    name: 'Shayo',
  },
  {
    id: 3,
    name: 'Adebayo',
  },
]
// Create (or import) a custom schema directive
class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result.toUpperCase()
      }
      return result
    }
  }
}

const typeDefs = gql`
  union UserOutput = UserFound | UserError

  type Query {
    user(id: ID!): UserOutput!
    age: Age
  }

  type User {
    id: ID!
    name: String!
  }

  type UserFound implements ServerStatus {
    success: Boolean!
    user: User!
    code: Int!
  }

  type UserError implements ServerStatus {
    success: Boolean!
    message: String!
    code: Int!
  }

  interface ServerStatus {
    success: Boolean!
    code: Int!
  }

  directive @deprecated(reason: String) on FIELD_DEFINITION | ENUM_VALUE
  directive @upper on FIELD_DEFINITION

  type Age {
    newAge: String
    message: String @upper
    oldAge: String @deprecated(reason: "**Use newAge**.")
  }
`
const resolvers = {
  UserOutput: {
    __resolveType: (obj, context, info) => {
      if (obj.success) {
        return 'UserFound'
      } else {
        return 'UserError'
      }

      return null
    },
  },
  ServerStatus: {
    __resolveType: (obj, context, info) => {
      if (obj.success) {
        return 'UserFound'
      } else {
        return 'UserError'
      }
    },
  },
  Query: {
    user: (parent, args, context, info) => {
      // If ID sent is check against database
      if (users.find((user) => user.id === +args.id)) {
        return {
          success: true,
          user: users.find((user) => user.id === +args.id),
          code: 200,
        }
      }

      return {
        success: false,
        message: 'User not found!!!',
        code: 400,
      }
    },
    age: () => {
      return { newAge: '12', message: 'hello world', oldAge: '10' }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: UpperCaseDirective,
  },
  playground: true,
  introspection: true,
})

server.listen().then(({ url }) => {
  console.log(`Graph server running at ${url}`)
})

// Union for error handling
// query getUser($id: ID!) {
//     user(id: $id) {
//       ... on UserError {
//         success
//         message,
//         code
//       }
//       ... on UserFound {
//         success,
//         user {
//           id,
//           name
//         },
//         code
//       }
//     }
//   }

// Union and Interface for Error Handling
// query getUser($id: ID!) {
//     user(id: $id) {
//       ... on ServerStatus {
//         success,
//         code
//       }
//       ... on UserError {
//         message,
//       }
//       ... on UserFound {
//         user {
//           id,
//             name
//         }
//       }
//     }
//   }
