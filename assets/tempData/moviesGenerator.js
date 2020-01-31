const movies = require('./moviesBuild')

function moviesGenerator() {
  return {
	  cacheable: true,
    code: `const movies = ${JSON.stringify(movies)}; export default movies;`
  }
}

module.exports = moviesGenerator
