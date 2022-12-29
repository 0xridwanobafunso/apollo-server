/**
 * @description To get all client
 * @access Public
 * @field clients
 * @param token
 */
exports.getClients = (token) => {
  // Util function to check and decode token

  return {
    success: false,
    message: 'You are not authorize to view this graph field',
    code: 401,
  }

  return {
    success: true,
    clients: [
      {
        id: 1,
        name: 'Obafunso',
        age: 15,
        products: [
          {
            id: 1,
            description: 'Description here............',
            price: 1799,
          },
          {
            id: 1,
            description: 'Description here............',
            price: 1799,
          },
        ],
      },
    ],
    code: 200,
  }
}

/**
 * @description To get single client
 * @access Public
 * @field client
 * @param 'token,id'
 */
exports.getClient = (token, id) => {
  // Util function to check and decode token

  //   return {
  //     success: false,
  //     message: 'You are not authorize to view this graph field',
  //     code: 401,
  //   }

  //   return {
  //     success: false,
  //     message: `Client not found with ${id}`,
  //     code: 404,
  //   }

  // IF FOUND success must be true
  return {
    success: true,
    client: {
      id: 1,
      name: 'Obafunso',
      age: 15,
      products: [
        {
          id: 1,
          description: 'Description here............',
          price: 1799,
        },
        {
          id: 1,
          description: 'Description here............',
          price: 1799,
        },
      ],
    },
    code: 404,
  }
}
