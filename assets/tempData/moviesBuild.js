const csv          = require('convert-csv-to-json')
const moviesLegacy = require('./moviesLegacy')  // Load legacy movie data

// Convert movies array to movies object keyed by slug
function moviesBySlug(data) {
  let result = {}

  for (var i=0; i<data.length; i++) {
    let movie = data[i]
    result[movie.movieSlug] = movie
  }

  return result
}

function parseArray(str) {
  try {
    return str.split('|')
  } catch (err) {
    return
  }
}

// Parse movies.csv and process film data lightly
function parseMovies() {
  let data = csv
    .fieldDelimiter(',')
    .formatValueByType()
                .getJsonFromCsv(__dirname + '/movies.csv')

    // Massage CSV data into final format
  for (let i=0; i<data.length; i++) {
    let movie = data[i]

    movie.trading      = movie.trading == 'TRUE'

    // New, more consistent arrays are stored as | separated strings
    movie.actors       = parseArray(movie.actors)
    movie.articles     = parseArray(movie.articles)
    movie.directors    = parseArray(movie.directors)
    movie.distributors = parseArray(movie.distributors)
    movie.genres       = parseArray(movie.genres)
    movie.writers      = parseArray(movie.writers)

    // TODO: Will be deprecated, preserved now for legacy compatibility
    movie.director     = movie.directors
    movie.genre        = movie.genres
    movie.writer       = movie.writers

    data[i] = movie
  }


  return data
}

// Merge in non-array data from old legacy movies file
function mergeData(legacy, parsed) {
  for (let slug in legacy) {
    try {
      parsed[slug].awards   = legacy[slug].awards
      parsed[slug].trailers = legacy[slug].trailers
    } catch (err) {
      console.error('Failed to update ' + slug)
    }
  }
  return parsed
}

// Re-organize data by slug and merge
let legacy = moviesBySlug(moviesLegacy)
let parsed = moviesBySlug(parseMovies())
let movies = Object.values(mergeData(legacy, parsed))

module.exports = movies
