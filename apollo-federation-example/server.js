const { ApolloGateway } = require('@apollo/gateway')
const { ApolloServer } = require('apollo-server')
const colors = require('colors')
const waitOn = require('wait-on')

waitOn({ resources: ['tcp:localhost:4001', 'tcp:localhost:4002'] })
  .then(() => {
    const GATEWAY_PORT = 4000

    // After making sure all the services have started
    // Then create gateway based on the ports
    const gateway = new ApolloGateway({
      serviceList: [
        { name: 'people', url: 'http://localhost:4001' },
        { name: 'films', url: 'http://localhost:4002' },
      ],
    })

    // Lets pass the gateway to apollo server
    const server = new ApolloServer({
      gateway,
      subscriptions: false,
      playground: true,
    })

    server.listen({ port: GATEWAY_PORT }).then(({ url }) => {
      console.log(`Graph ready at ${url}`.blue.underline.bold)
    })
  })
  .catch((err) => {
    console.log(err)
  })
