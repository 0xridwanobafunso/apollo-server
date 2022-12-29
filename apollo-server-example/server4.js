const { ApolloServer, gql, PubSub } = require('apollo-server')

/**
 * -------------------------------------------------------
 *                  PRODUCTION PUBSUB
 *                    START HERE
 */
// const Redis = require('ioredis')
// const { RedisPubSub } = require('graphql-redis-subscriptions')
// const options = {
//   port: 17464, // Redis port
//   host: 'redis-17464.c8.us-east-1-2.ec2.cloud.redislabs.com', // Redis host
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   password: 'PhfQAfiNa9kPbyFTfbNZZeH3a1B24ymB',
//   retryStrategy: (times) => {
//     // reconnect after
//     return Math.min(times * 50, 2000)
//   },
// }

// const pubsub = new RedisPubSub({
//   publisher: new Redis(options),
//   subscriber: new Redis(options),
// })
/**
 *              ENDS HERE
 * -----------------------------------------------------
 */

// Default GraphQL publish and subscribe - NOT GOOD FOR PRODUCTION APP
const pubsub = new PubSub()

const typeDefs = gql`
  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(author: String, comment: String): Post
  }

  type Subscription {
    postAdded: Post
  }

  type Post {
    author: String
    comment: String
  }
`

const POST_ADDED = 'POST_ADDED'
const posts = [
  { author: 'Riddo', comment: 'What an awesome blog post' },
  { author: 'Lateef', comment: 'Great writeup' },
  { author: 'Shefiu', comment: 'Straight forward article' },
]

const resolvers = {
  Query: {
    posts(root, args, context) {
      return posts
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args })

      posts.unshift({ author: args.author, comment: args.comment })

      return { author: args.author, comment: args.comment }
    },
  },
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context
    } else {
      // check from req
      const token = req.headers.authorization || ''

      return { token }
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, contex) => {
      //   authToken header is sent to with subscription query
      //   console.log(connectionParams.authToken)
      //   if (connectionParams.authToken) {
      //     return validateToken(connectionParams.authToken)
      //       .then(findUser(connectionParams.authToken))
      //       .then(user => {
      //         return {
      //           currentUser: user,
      //         };
      //       });
      //   }
      //   throw new Error('Missing auth token!');
    },
    onDisconnect: (webSocket, context) => {
      // ...
    },
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Graph Server Running @ ${url}`)
  console.log(`Graph Subscription Server Running @ ${subscriptionsUrl}`)
})

// Subscription Filter
// const { withFilter } = require('apollo-server');

// const resolvers = {
//     Query: () => { ... },
//     Mutation: () => { ... },
//     Subscription: {
//         commentAdded: {

//           subscribe: withFilter(
//             () => pubsub.asyncIterator('COMMENT_ADDED'),

//             (payload, variables) => {
//              return payload.commentAdded.repository_name === variables.repoFullName;
// If TRUE added to realtime server
//             },
//           ),
//         }
//     },
// };
