module.exports = {
  // Query start here!!!!!!!
  clients: (parent, args, { dataSources, token }, info) => {
    return dataSources.clientAPI.getClients(token.split(' ')[1])
  },
  client: (parent, { id }, { dataSources, token }, info) => {
    return dataSources.clientAPI.getClient(token.split(' ')[1], id)
  },
}
