const { GraphQLScalarType, Kind } = require('graphql')

module.exports = new GraphQLScalarType({
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
