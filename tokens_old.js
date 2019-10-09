let tokens = [
  {
    type:        'Film',             // type of media
    name:        'Prospect',         // title of project
    slug:        'prospect',         // name lowercase
    symbol:      'PROSPECT',         // token symbol, keep to ~6 characters
    invested:    true,

    price:       18.3,               // price per share should be between 0.5 -> 10
    count:       15000,              // number of shares owned, should be between 100 and total shares in even multiple
    funded:      28000000,           // amount of shares purchased, aka 100% funded
    shares:      30000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'April 5',           // date funding closes, should be within 5-90 days of now

    // Equity deal type
    // regulation:  '506(c) & Reg A', //  506(b) / 506(c) and/or Reg A / Reg S
    // security:    'equity',         // or debt
    // discount:    '20%',            // 10-30%
    // interest:    '5%',             // 5-20%
    // minimum:     50000,            // $1k->100k

    // Other regulation combinations:
    // regulation:    'Reg S',
    // regulation:    'Reg A',
    // regulation:    '506(b)',
    // regulation:    '506(c)',
    // regulation:    '506(c) & Reg A',
    // regulation:    '506(b) & Reg S',

    releaseDate: 'November 2, 2018', // release date, use any
    status:      'Soon On Demand',   // status of project

    imdb:        'tt794622',         // imdb id found in URL: http://www.imdb.com/title/tt7946422/?ref_=nv_sr_2',
    trailer:     'F96wbQ698Z0',      // youtube id of trailer
    preview:     'Preview_Prospect1b-min-1024x435.jpg',

    producers:   'A Depth of Field, The Realm and Ground Control production, in association with Creative Wealth Media',
    directors:   'Christopher Caldwell and Zeek Earl',
    writers:     'Christopher Caldwell and Zeek Earl',
    stars:       'Sophie Thatcher, Pedro Pascal, Jay Duplass, Andre Royo, Clifton Collins Jr., and Anwan Glover',

    genres:      'Drama | Sci-Fi | Thriller',
    mpaa:        'R',
    tagline:     'No One Survives Alone',

    synopsis:   `
      A teenage girl and her father travel to a remote alien moon, aiming to strike it rich. They've secured a contract to harvest a large deposit of the elusive gems hidden in the depths of the moon's toxic forest. But there are others roving the wilderness and the job quickly devolves into a fight to survive. Forced to contend not only with the forest's other ruthless inhabitants, but with her own father's greed-addled judgment, the girl finds she must carve her own path to escape.
    `,
  },
  {
    type:        'Film',
    name:        'The Mule',
    slug:        'the-mule',
    symbol:      'MULE',

    invested:    true,
    price:       2.25,
    count:       50000,
    funded:      8500000,
    shares:      8500000,

    security:    'equity',
    regulation:  '506(c) & Reg A',
    discount:    '20%',
    interest:    '5%',
    minimum:     50000,
    closes:      'April 15',

    releaseDate: 'December 14, 2018',
    status:      'Now In Theaters',

    imdb:        'tt7959026',
    trailer:     'N_QksSzK7sI',
    preview:     'Preview_TheMule-min-1024x435.jpg',

    directors:   'Clint Eastwood',
    producers:   'A Imperative Entertainment / The Malpaso Company production in association with BRON Creative',
    writers:     'Sam Dolnick (inspired by the New York Times Magazine Article "The Sinaloa Cartel\'s 90-Year Old Drug Mule" by), Nick Schenk',
    stars:       'Clint Eastwood, Michael Peña, Bradley Cooper, and Laurence Fishburne',

    genres:      'Crime | Drama | Thriller',
    mpaa:        'R',
    tagline:     'Nobody Runs Forever',

    synopsis: `
        A 90-year-old horticulturist and WWII veteran is caught transporting $3 million worth of cocaine through Michigan for a Mexican drug cartel.
    `,
  },
  {
    type:        'Film',
    name:        'To Dust',
    slug:        'to-dust',
    symbol:      'DUST',

    invested:    true,
    price:       3.0,
    count:       75000,
    funded:      1200000,
    shares:      1200000,

    security:   'debt',
    regulation: 'Reg A',
    discount:   0,
    interest:   '15%',
    minimum:    25000,
    closes:     'June 12',

    releaseDate: 'February 8, 2019',
    status:      'Now In Theatres',

    imdb:        'tt7117594',
    trailer:     'ULfhwPTMvC4',
    preview:     'Preview_ToDust-min-1024x435.jpg',

    producers:   'A Wing and a Prayer Production, A King Bee Production, in association with Storyland Pictures, Big Jack Productions, Cool Productions, BRON Studios, Salem Street Entertainment, UnLtd Productions',
    directors:   'Shawn Snyder',
    writers:     'Jason Begue, Shawn Snyder',
    stars:       'Matthew Broderick and Géza Röhrig',

    genres:      'Drama',
    mpaa:        'R',
    tagline:     '',

    synopsis:   `
      Shmuel, a Hasidic cantor in Upstate New York, distraught by the untimely death of his wife, struggles to find religious solace, while secretly obsessing over how her body will decay. As a clandestine partnership develops with Albert, a local community college biology professor, the two embark on a darkly comic and increasingly literal undertaking into the underworld.
    `,
  },
  {
    type:        'Film',
    name:        'Isn\'t it Romantic',
    slug:        'isnt-it-romantic',
    symbol:      'IRMNTC',

    invested:    true,
    price:       8.0,
    count:       100000,
    funded:      5000000,
    shares:      5000000,

    security:   'debt',
    regulation: '506(b)',
    discount:   '13%',
    interest:   0,
    minimum:    50000,
    closes:     'April 23',

    releaseDate: 'November 2, 2018', // release date, use any
    status:      'Soon On Demand',   // status of project

    imdb:        'tt794622',         // imdb id found in URL: http://www.imdb.com/title/tt7946422/?ref_=nv_sr_2',
    trailer:     '8ZwgoVmILQU',      // youtube id of trailer
    preview:     'Preview_IsntItRomantic-min-1024x435.jpg',

    producers:   'A Depth of Field, The Realm and Ground Control, in association with Creative Wealth Media',
    directors:   'Christopher Caldwell and Zeek Earl',
    writers:     'Christopher Caldwell and Zeek Earl',
    stars:       'Sophie Thatcher, Pedro Pascal, Jay Duplass, Andre Royo, Clifton Collins Jr., and Anwan Glover',

    genres:      'Drama | Sci-Fi | Thriller',
    mpaa:        'R',
    tagline:     'No One Survives Alone',

    synopsis:   `
      A teenage girl and her father travel to a remote alien moon, aiming to strike it rich. They've secured a contract to harvest a large deposit of the elusive gems hidden in the depths of the moon's toxic forest. But there are others roving the wilderness and the job quickly devolves into a fight to survive. Forced to contend not only with the forest's other ruthless inhabitants, but with her own father's greed-addled judgment, the girl finds she must carve her own path to escape.
    `,
  },
  {
    type:        'Film',
    name:        'A Single Shot',
    slug:        'a-single-shot',
    symbol:      'SINGLESHOT',

    invested:    true,
    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       15000,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      4000000,           // amount of shares purchased, aka 100% funded
    shares:      4500000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:    'equity',
    regulation:  '506(b) & Reg A',
    discount:    '15%',
    interest:    0,
    minimum:     200000,
    closes:      'June 25',

    releaseDate: 'August 20, 2013',
    status:      'Available on PPV, iTunes, or Amazon',

    imdb:        'tt1540741',
    trailer:     'utzeXjZm8IE',
    preview:     'ASingleShot-Preview-min.jpg',

    producers:   'A BRON Studios / Unified Pictures / Unanimous Entertainment co-production',
    directors:   'David M. Rosenthal',
    writers:     'Matthew F. Jones',
    stars:       'Sam Rockwell, William H. Macy, Jeffrey Wright, Jason Isaacs, Joe Anderson, Ophelia Lovibond, and Kelly Reilly',

    genres:      'Crime | Drama | Thriller',
    mpaa:        'R',
    tagline:     'One Chance, One Secret, One Mistake',

    synopsis:   `
    The tragic death of a beautiful young girl starts a tense and atmospheric game of cat and mouse between hunter John Moon and the hardened backwater criminals out for his blood.
    `,
  },
  {
    type:    'Film',
    name:    'Rudderless',
    price:   5.2,
    count:   10000,
    invested:    true,
    funded:      31000000,           // amount of shares purchased, aka 100% funded
    shares:      35000000,           // outstanding shares should be between 500k and 50M, in even multiples
    status:  'Available on PPV, iTunes, or Amazon',
    preview:  'Rudderless-Preview-min.jpg',
    directors: 'William H. Macy',
    stars: 'Billy Crudup, Anton Yelchin, Felicity Huffman, Selena Gomez, William H. Macy, and Laurence Fishburne',
    imdb:    'http://www.imdb.com/title/tt1798243',
    trailer: 'http://bronstudios.com/productions/rudderless/#',
    synopsis: `
        A Unified Pictures production in association with BRON Studios

        A grieving father in a downward spiral stumbles across a box of his recently deceased son’s demo tapes and lyrics. Shocked by the discovery of this unknown talent, he forms a band in the hope of finding some catharsis.
    `
  },
  {
    type:    'Film',
    name:    'Welcome To Me',
    price:   1,
    count:   2000,

    invested:    true,
    funded:      1200000,           // amount of shares purchased, aka 100% funded
    shares:      3500000,           // outstanding shares should be between 500k and 50M, in even multiples
    status:  'Available on PPV, iTunes, or Amazon',
    preview:  'WelcomeToMe-Preview-min.jpg',
    directors: 'Shira Piven',
    stars: 'Kristen Wiig, Wes Bentley, James Marsden, Tim Robbins, Linda Cardellini, Joan Cusack, Jennifer Jason Leigh, Alan Tudyk, Thomas Mann, and Loretta Devine',
    imdb:    'http://www.imdb.com/title/tt2788716',
    trailer: 'http://bronstudios.com/productions/welcome-to-me/#',
    synopsis: `
        A BRON Studios / Gary Sanchez Productions co-production

        The dark comedy ‘Welcome to Me’ tells the story of Alice, a woman suffering from a borderline personality disorder who wins the mega-lottery and decides to spend all her money on a creating a talk show… A show that will reflect not only her larger-than-life personality and obsession with being famous, but also delves in to her troubled past, even if it means alienating her friends and family in the process.
    `
  },
  {
    type:    'Film',
    name:    'Meadowland',
    price:   1,
    count:   1000,
    invested:    true,
    funded:      810000,           // amount of shares purchased, aka 100% funded
    shares:      1350000,           // outstanding shares should be between 500k and 50M, in even multiples
    status:  'Available on PPV, iTunes, or Amazon',
    preview:  'Meadowland-Preview-min.jpg',
    directors: 'Reed Morano',
    stars: 'Olivia Wilde, Luke Wilson, Elisabeth Moss, Giovanni Ribisi, John Leguizamo, Juno Temple, Kevin Corrigan, Merritt Weaver, and Scott Mescudi aka Kid Cudi',
    imdb:    'http://www.imdb.com/title/tt3529656/?ref_=fn_al_tt_1',
    trailer: 'http://bronstudios.com/productions/meadowland/#',
    synopsis: `
        A BRON Studios production

        In the hazy aftermath of an unimaginable loss, Sarah (Olivia Wilde) and Phil (Luke Wilson) come unhinged, recklessly ignoring the repercussions.  Phil starts to lose sight of his morals as Sarah puts herself in increasingly dangerous situations, falling deeper into her own fever dream.  From cinematographer Reed Morano in her directorsial debut, Meadowland presents powerful performances by Olivia Wilde and Luke Wilson alongside Giovanni Ribisi, Elisabeth Moss, John Leguizamo, Kevin Corrigan, Merritt Weaver, and Juno Temple.
    `
  },
  {
    type:    'Film',
    name:    'Tumbledown',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      1800000,           // amount of shares purchased, aka 100% funded
    shares:      1900000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available on PPV, iTunes, or Amazon',
    preview:  'Tumbledown-Preview-min.jpg',
    directors: 'Sean Mewshaw',
    stars: 'Jason Sudeikis, Rebecca Hall, Dianna Agron, Joe Manganiello, Blythe Danner, Griffin Dunne, and Richard Masur',
    imdb:    'http://www.imdb.com/title/tt2338424',
    trailer: 'http://bronstudios.com/productions/tumbledown/#',
    synopsis: `
        A BRON Studios production

        A young woman struggles to move on with her life after the death of her husband, an acclaimed folk singer, when a brash New York writer forces her to confront her loss and the ambiguous circumstances of his death.
    `
  },
  {
    type:    'Film',
    name:    'Hyena Road',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      2800000,           // amount of shares purchased, aka 100% funded
    shares:      3000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'April 25',           // date funding closes, should be within 5-90 days of now

    status:  'Available on PPV, iTunes, or Amazon',
    directors: 'Paul Gross',
    stars: 'Rossif Sutherland, Paul Gross, Christine Horne, Clark Johnson, Allan Hawco, Jennifer Pudavick, David Richmond-Peck, and Nikki Duval',
    imdb:    'http://www.imdb.com/title/tt4034452/?ref_=nv_sr_1',
    trailer: 'http://bronstudios.com/productions/hyena-road/#',
    synopsis: `
        A BRON Creative / Rhombus Media / Buffalo Gal Pictures Production

        Three different men, three different worlds, three different wars – all stand at the intersection of modern warfare – a murky world of fluid morality where all is not as it seems.
    `,
    preview:  'HyenaRoad-Preview-min.jpg',
  },
  {
    type:    'Film',
    name:    'I Saw The Light',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      7000000,           // amount of shares purchased, aka 100% funded
    shares:      7000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'April 28',           // date funding closes, should be within 5-90 days of now
    status:  'Available on PPV, iTunes, or Amazon',

    directors: 'Marc Abraham',
    stars: 'Tom Hiddleston, Elizabeth Olsen, Bradley Whitford, Cherry Jones, Maddie Hasson, Wrenn Schmidt, and David Krumholtz',
    imdb:    'http://www.imdb.com/title/tt3789828/',
    trailer: 'http://bronstudios.com/productions/i-saw-the-light/#',
    synopsis: `,
        A BRON Studios / RatPac Entertainment co-production

        It is said that great art is the product of struggle and hardship, and truer words have never been spoken when it comes to the life and music of Hank Williams. “I Saw the Light” showcases the meteoric rise to fame and fortune of one of the greatest and most influential country singers of all time, but it also delves into the dark and troubled life that existed away from the spotlight. From the drug & alcohol addictions to troubled relationships to the string of broken hearts he left in his wake, it was Hank Williams’ tumultuous existence that not only fueled his powerful lyrics and heartfelt songs, but also brought his life to its tragically short end.
    `,
    preview:  'ISawTheLight-Preview-min.jpg',
  },
  {
    type:    'Film',
    name:    'The Driftless Area',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      33000000,           // amount of shares purchased, aka 100% funded
    shares:      35000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'April 15',           // date funding closes, should be within 5-90 days of now
    status:  'Available on PPV, iTunes, or Amazon',
    directors: 'Zachary Sluser',
    stars: 'Zooey Deschanel, Anton Yelchin, John Hawkes, Aubrey Plaza, Frank Langella, and Ciaran Hinds',
    imdb:    'http://www.imdb.com/title/tt3687304',
    trailer: 'http://bronstudios.com/productions/the-driftless-area/#',
    synopsis: `
        A BRON Studios / Unified Pictures co-production

        “The Driftless Area” is an atmospheric dark comedy that centres on the enigmatic Stella (Deschanel) and Pierre (Yelchin), a quietly resourceful bartender who returns to his hometown after the death of his parents. When Pierre falls in love with Stella, he is unwittingly drawn into a circle of fate pitting him against the volatile criminal Shane (Hawkes).
    `,
    preview:  'TheDriftlessArea-Preview-min.jpg',
  },
  {
    type:    'Film',
    name:    'Into The Forest',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      11000000,           // amount of shares purchased, aka 100% funded
    shares:      20000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available on PPV, iTunes, or Amazon',

    directors: 'Patricia Rozema',
    stars: 'Ellen Page, Evan Rachel Wood, Max Minghella, Michael Eklund, and Callum Keith Rennie',
    imdb:    'http://www.imdb.com/title/tt2625810/?ref_=fn_al_tt_1',
    trailer: 'http://bronstudios.com/productions/into-the-forest/#',
    synopsis: `
        A BRON Studios / Rhombus Media co-production

        In the not too distant future, two privileged young women who live in a remote ancient forest with their family, discover the world around them is on the brink of an apocalypse. Informed only be rumour, they fight intruders, disease, loneliness, and starvation. Over the course of the story, they are transformed from helpless though refined young women to powerful but completely primitive creatures.
    `,
    preview:  'IntoTheForest-Preview-min.jpg',
  },
  {
    type:    'Film',
    name:    'Special Correspondents',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      1800000,           // amount of shares purchased, aka 100% funded
    shares:      6000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available on PPV, iTunes, or Amazon',

    status:  'Available On Netflix',
    preview:  'SpecialCorrespondents-Preview-min.jpg',
    directors: 'Ricky Gervais',
    stars: 'Eric Bana, Ricky Gervais, Vera Farmiga, Kelly Macdonald, Kevin Pollak, America Ferrera, Raúl Castillo, and Benjamin Bratt',
    imdb:    'http://www.imdb.com/title/tt4181052/',
    trailer: 'http://bronstudios.com/productions/special-correspondents/#',
    synopsis: `
        A BRON Studios / Unanimous Entertainment co-production, in association with Creative Wealth Media

        Special Correspondents is a remake of a French Film of the same title. The high concept comedy revolved around two radio journalists who lose their tickets and passports on the way to the airport. When they realize their mistake they decide to pretend to be at the destination they were sent and instead hole up in a neighbourhood restaurant. Their fake coverage of the war becomes a national sensation and has hilarious consequences.
    `
  },
  {
    type:    'Film',
    name:    'The Birth of a Nation',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      900000,           // amount of shares purchased, aka 100% funded
    shares:      950000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    count:   400000,

    status:  'Available On Demand',
    preview:  'TheBirthOfANation-Preview-min.jpg',
    directors: 'Nate Parker',
    stars: 'Armie Hammer, Nate Parker, Aja Naomi King, Penelope Ann Miller, Colman Domingo, Roger Guenveur Smith, Dwight Henry, Mark Boone Jr., Jackie Earle Haley, Aunjanue Ellis, Esther Scott, and Gabrielle Union',
    imdb:    'http://www.imdb.com/title/tt4196450',
    trailer: 'http://bronstudios.com/productions/the-birth-of-a-nation/#',
    synopsis: `
        A BRON Studios / Phantom Four / Mandalay Pictures / Tiny Giant Productions co-production in association with Follow Through Productions, Infinity Entertainment, and Creative Wealth Media Finance.

        Nat Turner, a former slave in America, leads a liberation movement in 1831 to free African-Americans in Virgina that results in a violent retaliation from whites.
    `
  },
  {
    type:    'Film',
    name:    'The Layover',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      4300000,           // amount of shares purchased, aka 100% funded
    shares:      4900000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    status:  'Available On PPV, iTunes, or Netflix',
    preview:  'TheLayover-Preview-min.jpg',
    directors: 'William H. Macy',
    stars: 'Alexandra Daddario, Kate Upton, Kal Penn, Matt Jones, Rob Corddry, Molly Shannon, and Matt Barr',
    imdb:    'http://www.imdb.com/title/tt4565520',
    trailer: 'http://bronstudios.com/productions/the-layover/#',
    synopsis: `
        A BRON Studios / Unified Pictures co-production

        When their plane is rerouted due to a hurricane warning, two single female best friends find themselves competing for the same guy during an extended layover in St. Louis.
    `
  },
  {
    type:    'Film',
    name:    'Una',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      6100000,           // amount of shares purchased, aka 100% funded
    shares:      6700000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available On Demand',
    preview:  'Una-Preview-min.jpg',
    directors: 'Benedict Andrews',
    stars: 'Rooney Mara, Ben Mendelsohn, Indira Varma, Riz Ahmed, Poppy Corby-Tuech, and Tara Fitzgerald',
    imdb:    'http://www.imdb.com/title/tt2315582/',
    trailer: 'http://bronstudios.com/productions/una-2/#',
    synopsis: `
        A BRON Creative / Jean Doumanian Productions / WestEnd Films Production

        When a young woman unexpectedly arrives at an older man’s workplace, looking for answers, the secrets of the past threaten to unravel his new life. Their confrontation will uncover buried memories and unspeakable desires. It will shake them both to the core.
    `
  },
  {
    type:    'Film',
    name:    'The Cleanse',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      1200000,           // amount of shares purchased, aka 100% funded
    shares:      1500000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    status:  'Available On Demand',
    preview:  'Preview_TheCleanse-min-1024x435.jpg',
    directors: 'Bobby Miller',
    stars: 'Johnny Galecki, Anna Friel, Oliver Platt, and Anjelica Huston',
    imdb:    'http://www.imdb.com/title/tt3734354/?ref_=nv_sr_1',
    trailer: 'http://bronstudios.com/productions/the-cleanse/#',
    synopsis: `
        A BRON Studios, Gilbert Films, Alcide Bava Production in association with Creative Wealth Media

        Paul Berger is an unemployed, down and out, heartbroken man searching for happiness. When Paul sees an ad for a spiritual retreat promising to restart your life, he immediately signs up, hoping to cleanse himself and fix his broken life.  But after only a few days, he discovers the cleanse is releasing more than just everyday toxins… a lot more.
    `
  },
  {
    type:    'Film',
    name:    'Fences',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      880000,           // amount of shares purchased, aka 100% funded
    shares:      500000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    status:  'Available On Demand',
    preview:  'Fences-Preview-min.jpg',
    directors: 'Denzel Washington',
    stars: 'Denzel Washington, Viola Davis, Mykelti Williamson, Russell Hornsby, Jovan Adepo, Saniyya Sidney, and Christopher Mele',
    imdb:    'http://www.imdb.com/title/tt2671706',
    trailer: 'http://bronstudios.com/productions/fences/#',
    synopsis: `
        A BRON Creative / Paramount Pictures / MACRO production

        Based on the award winning play, Fences by August Wilson, the story follows a former baseball player who struggles to provide for his family as a trash collector in 1950’s Pittsburgh after being denied playing Major League baseball because he’s African American.
    `
  },
  {
    type:    'Film',
    name:    'Beatriz At Dinner',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      2800000,           // amount of shares purchased, aka 100% funded
    shares:      3000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available On Demand',
    preview:  'BeatrizAtDinner-Preview-min.jpg',
    directors: 'Miguel Arteta',
    stars: 'Salma Hayek, John Lithgow, Jay Duplass, Chloe Sevigny, Connie Britton, Amy Landecker, and David Warshofsky',
    imdb:    'http://www.imdb.com/title/tt5929750/',
    trailer: 'http://bronstudios.com/productions/beatriz-at-dinner/#',
    synopsis: `
        A BRON Studios / Killer Films production, in association with Creative Wealth Media

        Beatriz, an immigrant from a poor town in Mexico, has drawn on her innate kindness to build a career as a health practitioner in Southern California. Don Strutt is a real estate developer whose cutthroat tactics have made him a self-made, self-satisfied billionaire. When these two polar opposites meet at a dinner party, their worlds collide and neither will ever be the same.
    `
  },
  {
    type:    'Film',
    name:    'Roman J. Israel, Esq.',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      6000000,           // amount of shares purchased, aka 100% funded
    shares:      6200000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    status:  'Available On Demand',
    preview:  'RomanJIsraelEsq-Preview-min.jpg',
    directors: 'Dan Gilroy',
    stars: 'Denzel Washington, Colin Farrell, Ashton Sanders, and Carmen Ejogo',
    imdb:    'http://www.imdb.com/title/tt6000478/',
    trailer: 'http://bronstudios.com/productions/roman-israel-esq/#',
    synopsis: `
        Sony Pictures presents, A Cross Creek / Image Nation / MACRO / BRON Creative production

        Roman J. Israel (Denzel Washington), a driven and idealistic defense attorney who, through a series of tumultuous events, finds himself in a crisis that leads to extreme action.
    `
  },
  {
    type:    'Film',
    name:    'Tully',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      100000,           // amount of shares purchased, aka 100% funded
    shares:      750000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available On Demand',
    preview:  'Preview_Tully-min-1024x435.jpg',
    directors: 'Jason Reitman',
    stars: 'Charlize Theron, Mackenzie Davis, Ron Livingston, and Mark Duplass',
    imdb:    'http://www.imdb.com/title/tt5610554/',
    trailer: 'http://bronstudios.com/productions/tully/#',
    synopsis: `
        A BRON Studios / Right of Way production in association with Creative Wealth Media

        Married with two kids, and a 3rd about to be born, a woman begrudgingly accepts her well-to-do brother’s gift of a “night nanny”, in the hopes that it will alleviate some of the stress in her life. The “night nanny” arrives in the form of a beautiful free spirited college girl who helps the woman do more than just find time an energy, completely turning her life around in the most unexpected ways.
    `
  },
  {
    type:    'Film',
    name:    'Leave No Trace',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      3000000,           // amount of shares purchased, aka 100% funded
    shares:      3100000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    preview:  'LeaveNoTrace.jpg',
    directors: 'Debra Granik',
    stars: 'Ben Foster, Thomasin McKenzie, Jeff Kober, and Dale Dickey',
    imdb:    'http://www.imdb.com/title/tt3892172/',
    trailer: 'http://bronstudios.com/productions/leave-no-trace/#',
    synopsis: `
        A Revision Films / BRON Creative / First Look Media production

        A father and daughter live a perfect but mysterious existence in Forest Park, a beautiful nature reserve near Portland, Oregon, rarely making contact with the world. A small mistake tips them off to authorities sending them on an increasingly erratic journey in search of a place to call their own.
    `
  },
  {
    type:    'Film',
    name:    'The Spy Who Dumped Me',
    symbol:  'SPYDUMP',
    symbol:  'SPYDUMP',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      8000000,           // amount of shares purchased, aka 100% funded
    shares:      9000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available On Demand',

    preview:  'Preview_TheSpyWDM-min.jpg',
    directors: 'Susanna Fogel',
    stars: 'Mila Kunis, Kate McKinnon, Sam Heughan, Justin Theroux, and Gillian Anderson',
    imdb:    'https://www.imdb.com/title/tt6663582/?ref_=fn_al_tt_1',
    trailer: 'http://bronstudios.com/productions/the-spy-who-dumped-me/#',
    synopsis: `
        A Imagine Entertainment production in association with BRON Creative and Hercules Fund

        Audrey and Morgan are best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy.
    `
  },
  {
    type:    'Film',
    name:    'A Simple Favor',
    slug:    'a-simple-favor',
    symbol:  'ASFAVOR',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      18000000,           // amount of shares purchased, aka 100% funded
    shares:      22000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    status:  'Available On Demand',
    preview:  'Preview_ASimpleFavor-min-1024x435.jpg',
    directors: 'Paul Feig',
    stars: 'Anna Kendrick, Blake Lively, and Eric Johnson',
    imdb:    'https://www.imdb.com/title/tt7040874/?ref_=nv_sr_1',
    trailer: 'http://bronstudios.com/productions/a-simple-favor/#',
    synopsis: `
        A Feigco Entertainment production in association with BRON Creative and Hercules Fund

        The film centers around Stephanie (Anna Kendrick), a mommy blogger who seeks to uncover the truth behind her best friend Emily’s (Blake Lively) sudden disappearance from their small town.
    `
  },
  {
    type:      'Film',
    name:      'Assassination Nation',
    slug:      'assassination-nation',
    symbol:    'ANATION',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      410000,           // amount of shares purchased, aka 100% funded
    shares:      500000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now

    status:    'Available On Demand',
    preview:   'AssassinationNation-Preview-min.jpg',
    directors:  'Sam Levinson',
    producers: 'A BRON Studios / Phantom Four / Foxtail production, in association with Creative Wealth Media.',
    stars:  'Odessa Young, Suki Waterhouse, Hari Nef, Abra, Bella Thorne, Maude Apatow, Melanie Lynskey, Bill Skarsgard, and Joel McHale',
    imdb:      'http://www.imdb.com/title/tt6205872/',
    trailer:   'vTmFKZmp1aE',
    synopsis: `
        An anonymous hacker begins to terrorize a small town by releasing the most private and personal information of its residents until gossip turns to hysteria and hysteria leads to violence.
    `
  },
  {
    type:    'Animation',
    name:    'Henchmen',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      12000000,           // amount of shares purchased, aka 100% funded
    shares:      13000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available On Demand',
    preview:  'Henchmen-Preview-min.jpg',
    directors: 'Adam Wood',
    stars: 'Thomas Middleditch, James Marsden, Jane Krakowski, Rosario Dawson, Craig Robinson, Will Sasso, Alfred Molina, Rob Riggle, Nathan Fillion, and Bobcat Goldthwait',
    imdb:    'http://www.imdb.com/title/tt3076510/',
    trailer: 'http://bronstudios.com/productions/henchmen/#',
    synopsis: `
        A BRON Animation production, in association with Creative Wealth Media

        With dreams of being a supervillain, wide-eyed comic book fanboy Lester (Middleditch) joins the Union of Evil and becomes an apprentice to hardened henchman, Hank (Marsden). With the help of a few blue-collar co-workers (Krakowski, Dawson, Robinson), Hank and Lester mop up after bungling bad guys (Sasso, Molina, Riggle) and half-wit heroes (Fillion, Goldthwait) only to discover that it’s not easy being bad when you’re good.
    `
  },
  {
    type:    'Film',
    name:    'The Front Runner',

    price:       1.3,                // price per share should be between 0.5 -> 10
    count:       500,                // number of shares owned, should be between 100 and total shares in even multiple
    funded:      4800000,           // amount of shares purchased, aka 100% funded
    shares:      5000000,           // outstanding shares should be between 500k and 50M, in even multiples

    security:   'debt',              // type of security
    regulation: 'Reg S',             // type of regulation
    discount:   0,                   // discount only applies to equity
    interest:   '20%',               // interest on debt
    minimum:    50000,               // minimum investment
    closes:     'June 5',           // date funding closes, should be within 5-90 days of now
    status:  'Available On Demand',
    preview:  'TheFrontRunner-Preview-min.jpg',
    directors: 'Jason Reitman',
    stars: 'Hugh Jackman, Vera Farmiga, J.K. Simmons, Steve Zissis, Kevin Pollak, Mike Judge, Mark O’Brien, Molly Ephraim, Alex Karpovsky, Josh Brener, Tommy Dewey, Kaitlyn Dever, Alfred Molina, Spencer Garrett, Ari Graynor, Mamoudou Athie, Toby Huss, Sara Paxton, and Chris Coy',
    imdb:    'http://www.imdb.com/title/tt7074886/?ref_=nv_sr_7',
    trailer: 'http://bronstudios.com/productions/the-front-runner/#',
    synopsis: `
        A BRON Studios / Right of Way production, in association with Creative Wealth Media

        Oscar® nominee Hugh Jackman stars as the charismatic politician Gary Hart for Academy Award®-nominated directors Jason Reitman in the new thrilling drama The Front Runner.  The film follows the rise and fall of Senator Hart, who captured the imagination of young voters and was considered the overwhelming front runner for the 1988 Democratic presidential nomination when his campaign was sidelined by the story of an extramarital relationship with Donna Rice. As tabloid journalism and political journalism merged for the first time, Senator Hart was forced to drop out of the race – events that left a profound and lasting impact on American politics and the world stage.
    `
  },
  // {
  //   type:    'TV',
  //   name:    'Rare',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Development',
  //   preview:  'Generic.jpg',
  //   synopsis: `
  //       A cutting edge eco sci-fi concept for television based on an original idea by Thierry Poiraud (Black Spot, Alone, Atomik Circus).

  //       A BRON Studios, Dramacorp and Isolani Pictures co-production

  //       Rare takes place in the not so distant future as the world is running out of oxygen. Countries are no longer relevant and people have gathered from everywhere in different regions where pockets of oxygen remain. Local authorities decide who are the lucky ones to be cryogenically frozen, and who will be doomed to a bleak subsistence existence. Soon, there are those who will rise to break this cycle – like Hanna. She is not one of the lucky ones. In fact, she is so much more.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Those Who Wish me Dead',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Development',
  //   preview:  'Generic.jpg',
  //   directors: 'Taylor Sheridan',
  //   stars: 'Angelina Jolie',
  //   imdb:    'https://www.imdb.com/title/tt3215824/?ref_=nv_sr_1',
  //   synopsis: `
  //       A BRON Studios / Film Rites production, in association with Creative Wealth Media

  //       Sheridan’s script is a hard-boiled chase thriller set against a wildfire in the Montana wilderness, adapted from Michael Koryta’s bestselling novel.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Harry Haft',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Development',
  //   preview:  'Generic.jpg',
  //   directors: 'Barry Levinson',
  //   stars: 'Ben Foster',
  //   imdb:    'https://www.imdb.com/title/tt9242528/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       A BRON Studios / New Mandate Films production, in association with Creative Wealth Media

  //       Based on a true story, the film is set post-World War II and will star Ben Foster as Harry Haft, a boxer who fought fellow prisoners in the concentration camps to survive. Haunted by the memories and his guilt, he attempts to use high-profile fights against boxing legends like Rocky Marciano as a way to find his first love again.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Torrance (Working Title)',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Production',
  //   preview:  'Generic.jpg',
  //   directors: 'Gavin O’Connor',
  //   stars: 'Ben Affleck',
  //   imdb:    'https://www.imdb.com/title/tt8544498/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       A Warner Bros. / Pearl Street Films / Junehem Pictures production in association with BRON Creative

  //       A widowed, former basketball all-star lost family foundation in a struggle with addiction and attempts to comeback by becoming the coach of a disparate, ethnically mixed high school basketball team at his alma mater.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Anna',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Post-Production',
  //   preview:  'Generic.jpg',
  //   directors: 'Luc Besson',
  //   stars: 'Cillian Murphy, Luke Evans, and Helen Mirren',
  //   imdb:    'https://www.imdb.com/title/tt7456310/?ref_=nv_sr_1',
  //   synopsis: `
  //       A EuropaCorp production in association with BRON Creative and Hercules Fund

  //       The film is a female driven action based on an original idea by Luc Besson – the plot has not been revealed yet.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Untitled Charles Randolph Project',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Post-Production',
  //   preview:  'Generic.jpg',
  //   directors: 'Jay Roach',
  //   stars: 'Charlize Theron, Nicole Kidman, Margot Robbie, and John Lithgow',
  //   imdb:    'https://www.imdb.com/title/tt6394270/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       A BRON Studios production

  //       The story of an ensemble of women who took on the toxic male culture of Fox News and helped depose its chief architect, Roger Ailes.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Chaos Walking',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Post-Production',
  //   preview:  'Generic.jpg',
  //   directors: 'Doug Liman',
  //   stars: 'Daisy Ridley, Tom Holland, Mads Mikkelsen, Nick Jonas, and David Oyelowo',
  //   imdb:    'https://www.imdb.com/title/tt2076822/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       A Quadrant Pictures production in association with BRON Creative and Hercules Fund

  //       A dystopian world where there are no women and all living creatures can hear each others’ thoughts in a stream of images, words, and sounds called Noise.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Needle In A Timestack',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Post-Production',
  //   preview:  'Generic.jpg',
  //   directors: 'John Ridley',
  //   stars: 'Leslie Odom Jr., Freida Pinto, Cynthia Erivo and Orlando Bloom',
  //   imdb:    'https://www.imdb.com/title/tt7099280/',
  //   synopsis: `
  //       A BRON Studios production in association with Creative Wealth Media

  //       In a world where time travel is possible and the past and present constantly fluctuate, a husband and wife struggle to hold on their marriage as it is threatened by a time-traveling rival.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'The Philosophy of Phil',
  //   price:   15,
  //   count:   400000,
  //   status:  'Coming Soon',
  //   preview:  'Generic.jpg',
  //   directors: 'Greg Kinnear',
  //   stars: 'Greg Kinnear, Emily Mortimer, Luke Wilson, Bradley Whitford, Jay Duplass, Robert Forster, Kurt Fuller, and Megan Charpentier',
  //   imdb:    'http://www.imdb.com/title/tt5328006',
  //   synopsis: `
  //       A BRON Studios / Imperative Entertainment production, in association with Creative Wealth Media

  //       In this existential comedy, a depressed dentist whose life is falling apart struggles to get his life back on track, after his patient…. who seemed to have it all… unexpectedly kills himself.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Fonzo',
  //   price:   15,
  //   count:   400000,
  //   status:  'Coming Soon',
  //   preview:  'Generic.jpg',
  //   directors: 'Josh Trank ',
  //   stars: 'Tom Hardy, Linda Cardellini, Matt Dillon, Kyle MacLachlan, Katherine Narducci, Jack Lowden, Noel Fisher, and Tilda Del Toro',
  //   imdb:    'http://www.imdb.com/title/tt6199572/',
  //   synopsis: `
  //       A BRON Studios / A BAND APART production, in association with Creative Wealth Media

  //       South Florida, 1945. The harrowing memories of an ailing multi-millionaire haunt life in the present as he spends his final year surrounded by family. An unravelling of one of the 20th Century’s most iconic figures.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Monster',
  //   price:   15,
  //   count:   400000,
  //   status:  'Coming Soon',
  //   preview:  'Monster-Preview-min.jpg',
  //   directors: 'Anthony Mandler',
  //   stars: 'Kelvin Harrison Jr, Jeffrey Wright, Jennifer Hudson, Jennifer Ehle, Tim Blake Nelson, A$AP Rocky, Nas, and John David Washington',
  //   imdb:    'http://www.imdb.com/title/tt2850272/',
  //   synopsis: `
  //       A BRON Studios / Tonik / Get Lifted production, in association with Creative Wealth Media, Red Crown, and Charlevoix Entertainment

  //       “Monster” is what the prosecutor calls 17 year old honors student and aspiring filmmaker Steve Harmon. He is being charged with felony murder for a crime he says he did not commit. But is Steve really a monster? Adapted from the best-selling novel of the same name by Walter Dean Myers.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Parallel',
  //   price:   15,
  //   count:   400000,
  //   status:  'Coming Soon',
  //   preview:  'Preview_Parallel-min-1024x435.jpg',
  //   directors: 'Isaac Ezban',
  //   stars: 'Aml Ameen, Martin Wallstrom, Georgia King, Mark O’Brien, Alyssa Diaz, Kathleen Quinlan, and David Harewood',
  //   imdb:    'http://www.imdb.com/title/tt4922674/',
  //   synopsis: `
  //       The Realm production, in association with Creative Wealth Media

  //       After stumbling upon a mirror that serves as a gateway to an infinite ‘multiverse’, a group of 20-somethings discover that importing knowledge gained via their alternate selves bears increasingly dangerous consequences.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'The Red Sea Diving Resort',
  //   price:   15,
  //   count:   400000,
  //   status:  'Coming Soon',
  //   preview:  'Generic.jpg',
  //   directors: 'Gideon Raff',
  //   stars: 'Chris Evans, Haley Bennett, Alessandro Nivola, Alex Hassell, Michael K. Williams, Michiel Huisman, Sir Ben Kingsley, Mark Ivanir, and Greg Kinnear',
  //   imdb:    'http://www.imdb.com/title/tt6675186/',
  //   synopsis: `
  //       A BRON Studios and EMJAG co-production, in association with Creative Wealth Media

  //       With the help of Ari Kidron, a hothead agent, the Mossad ventured on a dangerous journey through the desert of Sudan to rescue Ethiopian Jews from Sudan in 1978. In order to not arouse suspicion, Ari and his team operated under the guise of a European vacation company, the Mossad leased a resort on the shores of the Red Sea. The Mossad’s Red Sea Diving Resort operated for 5 years. Over the course of that time they saved tens of thousands of refugees and brought them to Israel.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'The Nightingale',
  //   price:   15,
  //   count:   400000,
  //   status:  'Coming Soon',
  //   preview:  'Preview_TheNightingale-min-1024x435.jpg',
  //   directors: 'Jennifer Kent',
  //   stars: 'Aisling Franciosi, Sam Claflin, Damon Herriman, Harry Greenwood, Magnolia Junemuru, Baykali Ganambarr, and Michael Sheasby',
  //   imdb:    'http://www.imdb.com/title/tt4068576/',
  //   synopsis: `
  //       A BRON Creative / Made Up Pictures / Pacific Standard production in association with Screen Australia and Screen Tasmania

  //       Set in 1825, Clare, a young Irish convict woman, chases a British officer through the rugged Tasmanian wilderness, bent on revenge for a terrible act of violence he committed against her family. On the way she enlists the services of an Aboriginal tracker named Billy, who is also marked by trauma from his own violence-filled past.
  //   `
  // },
  //   {
  //   type:    'Film',
  //   name:    'Greyhound',
  //   price:   15,
  //   count:   400000,
  //   status:  'In Theatres June 8, 2020',
  //   preview:  'Generic.jpg',
  //   trailer: 'Generic.jpg',
  //   directors: 'Aaron Schneider',
  //   stars: 'Tom Hanks, Elisabeth Shue, Rob Morgan, and Stephen Graham',
  //   imdb:    'http://www.imdb.com/title/tt6048922/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       Sony Pictures presents, a BRON Creative, Playtone, FilmNation production

  //       Hanks stars as George Krause, a career Navy officer finally given command of a Navy destroyer where, along with the enemy, he fights his self-doubts and personal demons to prove he belongs. The title comes from the WWII battleship of the same name.
  //   `
  // },
  // {
  //   type:    'Film',
  //   name:    'Villains',
  //   price:   20,
  //   count:   150000,
  //   status:  'World Premiere at SXSW 2019',
  //   directors: 'Dan Berk and Robert Olsen',
  //   stars: 'Maika Monroe, Bill Skarsgård, Jeffrey Donovan, and Kyra Sedgwick',
  //   imdb:    'http://www.imdb.com/title/tt6378710/?ref_=fn_al_tt_1',
  //   trailer: 'Preview_Villains-min-1024x435.jpg',
  //   synopsis: `
  //       The Realm / Last Pictures production, in association with Creative Wealth Media

  //       When a pair of amateur criminals break into a suburban home, they stumble upon a dark secret and two sadistic homeowners who will do anything to keep it from getting out.
  //   `,
  //   preview:  'Preview_Villains-min-1024x435.jpg',
  // },
  // {
  //   type:    'Animation',
  //   name:    'The Willoughbys',
  //   price:   9.4,
  //   count:   2000,
  //   status:  'In Production',
  //   directors: 'Kris Pearn',
  //   stars: 'Ricky Gervais, Junea Rudolph, Terry Crews, Martin Short, Jane Krakowski, and Sean Cullen   *Other casting in progress.',
  //   imdb:    'http://www.imdb.com/title/tt5206260/',
  //   synopsis: `
  //       A BRON Animation production, in association with Creative Wealth Media

  //       When the four Willoughby children are abandoned by their selfish parents, they must learn how to adapt their old-fashioned values to the contemporary world in order to create something new: the modern family.
  //   `,
  //   preview: 'Preview_Villains-min-1024x435.jpg',
  // },
  // {
  //   type:    'TV',
  //   name:    'Shadowplay',
  //   price:   18.4,
  //   count:   3333,
  //   status:  'In Pre-Production',
  //   trailer: '',
  //   directors: 'Måns Mårlind and Björn Stein',
  //   stars: '*Casting underway',
  //   imdb:    'https://www.imdb.com/title/tt8879894/?ref_=fn_al_tt_2',
  //   synopsis: `
  //       BRON / Tandem Production

  //       Max McLaughlin is an American cop who arrives in Berlin in the summer of 1946 to help create a police force in the chaotic aftermath of the war. Max’s goal is to take down “Englemacher” Gladow, the Capone of post-war Berlin. At the same time, Max undertakes a secret crusade to find his missing brother, who is killing ex-Nazis in hiding. However, Max is completely unaware that he is being used as a pawn in what is the very beginning of the Cold War.
  //   `,
  //   preview: 'Generic.jpg',
  // },
  // {
  //   type:    'Film',
  //   name:    'Superintelligence',
  //   price:   18.4,
  //   count:   3333,
  //   status:  'In Theatres December 25, 2019',
  //   trailer: '',
  //   directors: 'Ben Falcone',
  //   stars: 'Melissa McCarthy, Bobby Cannavale, and James Corden',
  //   imdb:    'https://www.imdb.com/title/tt7178640/?ref_=nv_sr_1',
  //   synopsis: `
  //       A New Line Cinema / On the Day production in association with BRON Creative

  //       Carol Peters’ life is turned upside down when she is selected for observation by the world’s first superintelligence – a form of artificial intelligence that may or may not take over the world.
  //   `,
  //   preview: 'Generic.jpg',
  // },
  // {
  //   type:    'Film',
  //   name:    'The Kitchen',
  //   price:   18.4,
  //   count:   5000,
  //   status:  'In Theatres September 20, 2019',
  //   directors: 'Andrea Berloff',
  //   stars: 'Elisabeth Moss, Melissa McCarthy, Domhnall Gleeson, and Tiffany Haddish',
  //   imdb:    'https://www.imdb.com/title/tt5822564/?ref_=nv_sr_2',
  //   synopsis: `
  //       A New Line Cinema production in association with BRON Creative

  //       The wives of New York gangsters in Hell’s Kitchen in the 1970s continue to operate their husbands’ rackets after they’re locked up in prison.
  //   `,
  //   preview: 'Generic.jpg',
  // },
  // {
  //   type:    'Film',
  //   name:    'Joker',
  //   price:   18.4,
  //   count:   400,
  //   status:  'In Theatres October 4, 2019',
  //   trailer: '',
  //   directors: 'Todd Philips',
  //   stars: 'Joaquin Phoenix, Robert De Niro, and Zazie Beetz',
  //   imdb:    'https://www.imdb.com/title/tt7286456/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       A DC Comics / Joint Effort / Warner Bros. production in association with BRON Creative

  //       The film will center on how the popular comic book villain known as The Joker (Joaquin Phoenix) came to be.
  //   `,
  //   preview: 'Joker.jpg'
  // },
  // {
  //   type:    'Film',
  //   name:    'The Good Liar',
  //   price:   18.4,
  //   count:   150,
  //   status:  'In Theatres November 15, 2019',
  //   trailer: '',
  //   directors: 'Bill Condon',
  //   stars: 'Helen Mirren and Ian McKellen',
  //   imdb:    'http://www.imdb.com/title/tt5563334/?ref_=fn_al_tt_1',
  //   synopsis: `
  //       A New Line Cinema production, in association with BRON Creative

  //       Career con artist Roy Courtnay (Ian McKellen) can hardly believe his luck when he meets well-to-do widow Betty McLeish (Helen Mirren) online. As Betty opens her home and life to him, Roy is surprised to find himself caring about her, turning what should be a cut-and-dry swindle into the most treacherous tightrope walk of his life.
  //   `,
  //   preview: 'Generic.jpg'
  // },
]

// Add closeDate and estimate investors
for (let token of tokens) {
  token.closeDate = new Date(token.closes + ', 2019')
  token.investors = Math.round(token.funded / (token.minimum * 4)) + 1
}

export default tokens
