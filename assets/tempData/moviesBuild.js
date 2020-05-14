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

function parseDescription(str) {
  if (str[0] === '"') {
    str = str.substr(1, str.length-2)
  }
  return str
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateTrailerDetails() {
  const trailerDetails  = { reaction: {} }

  const booleanValue = Math.random() >= 0.5
  const reactionType = Math.random() >= 0.1 ? 'like' : 'unlike'

  trailerDetails.duration = randomNumber(130, 240)
  trailerDetails.reaction.likeCount = randomNumber(100, 700000)
  trailerDetails.reaction.unlikeCount = randomNumber(100, 10000)
  trailerDetails.reaction.hasReaction = booleanValue
  trailerDetails.reaction.reactionType = booleanValue ? reactionType : null
  trailerDetails.subscribers = randomNumber(200000, 5000000)
  trailerDetails.views = randomNumber(60000, 4000000)
  trailerDetails.createdAt = randomDate(new Date(2019, 12, 12), new Date())

  return trailerDetails
}

// Parse movies.csv and process film data lightly
function parseMovies() {
  let data = csv
    .fieldDelimiter('\t')
    .formatValueByType()
    .getJsonFromCsv(__dirname + '/movies.tsv')

    // Massage CSV data into final format
  for (let i=0; i<data.length; i++) {
    let movie = data[i]

    movie.trading          = movie.trading == 'TRUE'

    // New, more consistent arrays are stored as | separated strings
    movie.actors           = parseArray(movie.actors)
    movie.articles         = parseArray(movie.articles)
    movie.directors        = parseArray(movie.directors)
    movie.distributors     = parseArray(movie.distributors)
    movie.genres           = parseArray(movie.genres)
    movie.writers          = parseArray(movie.writers)
    movie.shortDescription = parseDescription(movie.shortDescription)
    movie.longDescription  = parseDescription(movie.shortDescription)

    // TODO: Will be deprecated, preserved now for legacy compatibility
    movie.director         = movie.directors
    movie.genre            = movie.genres
    movie.writer           = movie.writers

    // data for new trailer video experience
    movie.trailerDetails = generateTrailerDetails()
    movie.distributorImg = 'http://placehold.it/32x32'

    data[i] = movie
  }


  return data
}

// Merge in non-array data from old legacy movies file
function mergeData(legacy, parsed) {
  for (let slug in legacy) {
    try {
      parsed[slug].awards   = legacy[slug].awards
      parsed[slug].trailers = legacy[slug].trailers.map((trailer => ({ ...trailer, trailerDetails: generateTrailerDetails() })))
      parsed[slug].productionId = legacy[slug].productionId
      parsed[slug].highlightedTags = legacy[slug].highlightedTags
      parsed[slug].tags = legacy[slug].tags
      parsed[slug].amountOfInvestors = legacy[slug].amountOfInvestors
      parsed[slug].raisedAmount = legacy[slug].raisedAmount
      parsed[slug].fundingGoal = legacy[slug].fundingGoal
      parsed[slug].daysLeft = legacy[slug].daysLeft
    } catch (err) {
      console.error(`Failed to update ${slug}: ${err.toString()}`)
    }
  }
  return parsed
}

// Re-organize data by slug and merge
let legacy = moviesBySlug(moviesLegacy)
let parsed = moviesBySlug(parseMovies())
let movies = Object.values(mergeData(legacy, parsed))

module.exports = movies
