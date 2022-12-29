const dateScalar = require('../../../scalars/v1/date')

module.exports = {
  // For Global Interfaces, Scalar Type e.t.c
  ServerResponse: {
    __resolveType: (obj, context, info) => {},
  },
  Date: dateScalar,
}
