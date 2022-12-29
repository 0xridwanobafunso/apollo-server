const { ApolloServer } = require('apollo-server')
const colors = require('colors')
const typeDefs = require('./types/v1/index')
const resolvers = require('./resolvers/v1/index')
const UpperCaseDirective = require('./directives/v1/upper')
const clientAPI = require('./datasources/v1/clients')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ''

    return {
      token,
    }
  },
  dataSources: () => ({
    clientAPI: new clientAPI(),
  }),
  schemaDirectives: {
    upper: UpperCaseDirective,
  },
  playground: true,
})

server.listen().then(({ url }) => {
  console.log(`Graph running on ${url}`.blue.bold.underline)
})
