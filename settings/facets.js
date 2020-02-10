const genre = {
  name: 'genres',
  titleAll: 'All Genres',
  titleSome: 'Genre',
  values: [
    {
      key: 'Action',
      color: '#2676ee',
      gradient: 'linear-gradient(90deg, #015ce3 0%, #4a90f9 100%)',
      image: null,
    },
    {
      key: 'Comedy',
      color: '#24c6ea',
      gradient: 'linear-gradient(90deg, #02b0d7 0%, #46dbfc 100%)',
      image: null,
    },
    {
      key: 'Documentary',
      color: '#47d4ba',
      gradient: 'linear-gradient(90deg, #26c3ac 0%, #69e6c8 100%)',
      image: null,
    },
    {
      key: 'Drama',
      color: '#76dd7b',
      gradient: 'linear-gradient(90deg, #6bc959 0%, #80f09b 100%)',
      image: null,
    },
    {
      key: 'Romance',
      color: '#f3913d',
      gradient: 'linear-gradient(90deg, #e77718 0%, #ffaa61 100%)',
      image: null,
    },
    {
      key: 'Sci-Fi',
      color: '#ef4343',
      gradient: 'linear-gradient(90deg, #e01717 0%, #fe7070 100%)',
      image: null,
    },
    {
      key: 'Thriller',
      color: '#ad4bc3',
      gradient: 'linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)',
      image: null,
    },
  ]
}

const distributor = {
  name: 'distributors',
  titleAll: 'All Studios',
  titleSome: 'Studio',
  values: [
    {
      key: 'Disney',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Fox',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Lionsgate',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Netflix',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Paramount',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'STX',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Universal',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Amazon',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Warner',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Neon',
      color: null,
      gradient: null,
      image: null
    },
    {
      key: 'Sony',
      color: null,
      gradient: null,
      image: null
    },
  ]
}

  // must use CommonJS style since this is require() 'd by the build system
module.exports = [genre, distributor]
