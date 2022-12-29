const people = [
  { id: '1', name: 'Steven Spielberg' },
  { id: '2', name: 'Richard Dreyfuss' },
  { id: '3', name: 'Harrison Ford' },
]

module.exports = {
  Person: {
    __resolveReference: (object) => {
      return people.find((person) => person.id === object.id)
    },
  },
}
