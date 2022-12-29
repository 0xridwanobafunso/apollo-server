const path = require('path')
const { mergeResolvers, loadFilesSync } = require('graphql-tools')

const resolversArray = loadFilesSync(path.join(__dirname, './**/index.*'), {
  extensions: ['js'],
})

module.exports = mergeResolvers(resolversArray, { all: true })
