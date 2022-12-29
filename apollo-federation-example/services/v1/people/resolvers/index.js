const Query = require('./query')
const Obj = require('./object')
const Mutation = require('./mutation')

module.exports = {
  Query,
  ...Obj,
  // Mutation,
  // Subscription,
}
