const films = [
  {
    id: '1',
    title: 'Jaws',
    actors: ['2'],
    director: '1',
  },
  {
    id: '2',
    title: 'Close Encounters of the Third Kind',
    actors: ['2'],
    director: '1',
  },
  {
    id: '3',
    title: 'Raiders of the Lost Ark',
    actors: ['3'],
    director: '1',
  },
]

module.exports = {
  film: (_, { id }) => {
    return films.find((film) => film.id === id)
  },
  films: () => {
    return films
  },
}
