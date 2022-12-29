const { DataSource } = require('apollo-datasource')
const { getClients, getClient } = require('../../controllers/v1/clients')

class clientAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {
    this.context = config.context
  }

  getClients(token) {
    return getClients(token)
  }

  getClient(token, id) {
    return getClient(token, id)
  }
}

module.exports = clientAPI
