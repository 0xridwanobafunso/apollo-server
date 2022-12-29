const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const color = require('colors')
const typeDefs = require('./types/index')
const resolvers = require('./resolvers/index')

const SERVICE_PORT = 4001

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

server.listen({ port: SERVICE_PORT }).then(({ url }) => {
  console.log(`People service ready at ${url}`.magenta.bold)
})
