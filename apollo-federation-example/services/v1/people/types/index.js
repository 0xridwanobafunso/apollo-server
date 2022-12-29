const { mergeTypeDefs, loadFilesSync } = require('graphql-tools')
const path = require('path')

const typeDefs = loadFilesSync(path.join(__dirname, ''), {
  extensions: ['gql'],
})

module.exports = mergeTypeDefs(typeDefs, { all: true })
