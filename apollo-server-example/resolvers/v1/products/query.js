module.exports = {
  // Query start here!!!!!!!
  products: (_, __, context, info) => {
    return [
      {
        id: 1,
        description: 'Heyyyyyyyyyy',
        price: 3900,
      },
      {
        id: 2,
        description: "What's up",
        price: 2800,
      },
    ]
  },
}
