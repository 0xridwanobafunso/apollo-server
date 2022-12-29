const Query = require('./query')
const Obj = require('./object')
const Mutation = require('./mutation')
const Subscription = require('./subscription')

module.exports = {
  Query,
  ...Obj,
  // Mutation,
  // Subscription,
}
