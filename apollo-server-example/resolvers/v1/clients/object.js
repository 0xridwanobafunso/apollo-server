module.exports = {
  // Object start here!!!!!!!
  GetClients: {
    __resolveType: (obj, context, info) => {
      if (obj.success) {
        return 'Clients'
      } else {
        return 'NotAuthorize'
      }
    },
  },
  GetClientById: {
    __resolveType: (obj, context, info) => {
      if (obj.success) {
        return 'ClientFound'
      } else if (obj.code == '404') {
        return 'ClientNotFound'
      } else {
        return 'NotAuthorize'
      }
    },
  },
}
