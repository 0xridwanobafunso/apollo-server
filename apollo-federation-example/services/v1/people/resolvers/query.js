const people = [
  { id: '1', name: 'Obafunso Ridwan' },
  { id: '2', name: 'Joel Joseph' },
  { id: '3', name: 'Sogbesan Basit' },
]

module.exports = {
  person: (_, { id }) => {
    return people.find((person) => person.id === id)
  },
  people: () => {
    return people
  },
}
