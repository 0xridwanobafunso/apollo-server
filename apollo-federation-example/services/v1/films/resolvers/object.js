const films = [
  {
    id: '1',
    title: 'Legend of the Seeker',
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
  Film: {
    actors: (film) => {
      return film.actors.map((actor) => ({ __typename: 'Person', id: actor }))
    },
    director: (film) => {
      return { __typename: 'Person', id: film.director }
    },
  },
  Person: {
    appearedIn: (person) => {
      return films.filter((film) =>
        film.actors.find((actor) => actor === person.id)
      )
    },
    directed: (person) => {
      return films.filter((film) => film.director === person.id)
    },
  },
}
