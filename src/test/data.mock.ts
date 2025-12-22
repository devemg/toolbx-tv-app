import type {
  IContent,
  IContentListResponse,
  IContentResponse,
} from "@/models/content";

export const mockContent: IContent = {
  id: "tt0111161",
  media_type: "movie",
  title: "The Shawshank Redemption",
  overview: "Two imprisoned men bond over a number of years",
  backdrop_path: "https://image.tmdb.org/t/p/w1280/test.jpg",
  poster_path: "https://image.tmdb.org/t/p/w500/test.jpg",
  original_title: "The Shawshank Redemption",
  original_language: "en",
  release_date: new Date("1994-09-23"),
  duration: 8520,
  currentViewTime: 4260,
  genres: [
    {
      id: "18",
      name: "Drama",
    },
    {
      id: "80",
      name: "Crime",
    },
  ],
};

export const mockContentResponse: IContentResponse = {
  page: 1,
  total_pages: 1,
  total_results: 3,
  results: [
    {
      id: "tt0111161",
      media_type: "movie",
      title: "The Shawshank Redemption",
      overview:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      backdrop_path:
        "https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
      poster_path:
        "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      original_title: "The Shawshank Redemption",
      original_language: "en",
      release_date: new Date("1994-09-23"),
      currentViewTime: 8520, // 2h 22m
      duration: 8520,
      genres: [
        {
          id: "18",
          name: "Drama",
        },
        {
          id: "80",
          name: "Crime",
        },
      ],
    },
    {
      id: "tt0468569",
      media_type: "movie",
      title: "The Dark Knight",
      overview:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      backdrop_path:
        "https://image.tmdb.org/t/p/w1280/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
      poster_path:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      original_title: "The Dark Knight",
      original_language: "en",
      release_date: new Date("2008-07-18"),
      currentViewTime: 4200, // 1h 10m
      duration: 9120,
    },
    {
      id: "tt0903747",
      media_type: "tv",
      title: "Breaking Bad",
      overview:
        "A high school chemistry teacher turned methamphetamine producer navigates the dangers of the criminal underworld.",
      backdrop_path:
        "https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
      poster_path:
        "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      original_title: "Breaking Bad",
      original_language: "en",
      release_date: new Date("2008-01-20"),
      currentViewTime: 1800, // 30m
      duration: 3600,
    },
  ],
};

export const mockContentLists: IContentListResponse = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      id: "CD1",
      title: "Continue Watching",
      showProgress: true,
      contents: mockContentResponse.results,
    },
    {
      id: "CD2",
      title: "Trending Now",
      showProgress: false,
      contents: [
        {
          id: "693134",
          media_type: "movie",
          title: "Dune: Part Two",
          overview:
            "Paul Atreides unites with the Fremen while seeking revenge against the conspirators who destroyed his family.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/6e7sf5Xz5L1Q9Ozr7XvY0Yt2rH6.jpg",
          original_title: "Dune: Part Two",
          original_language: "en",
          release_date: new Date("2024-02-27"),
          genres: [
            { id: "878", name: "Science Fiction" },
            { id: "12", name: "Adventure" },
            { id: "28", name: "Action" },
          ],
        },
        {
          id: "533535",
          media_type: "movie",
          title: "Deadpool & Wolverine",
          overview:
            "Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits Wolverine to save his universe.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg",
          original_title: "Deadpool & Wolverine",
          original_language: "en",
          release_date: new Date("2024-07-24"),
          genres: [
            { id: "28", name: "Action" },
            { id: "35", name: "Comedy" },
            { id: "878", name: "Science Fiction" },
          ],
        },
        {
          id: "786892",
          media_type: "movie",
          title: "Furiosa: A Mad Max Saga",
          overview:
            "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great biker horde.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/1m1rXopfNDVL3UMiv6kriYaJ3yE.jpg",
          original_title: "Furiosa: A Mad Max Saga",
          original_language: "en",
          release_date: new Date("2024-05-22"),
          genres: [
            { id: "28", name: "Action" },
            { id: "12", name: "Adventure" },
            { id: "878", name: "Science Fiction" },
          ],
        },
        {
          id: "823464",
          media_type: "movie",
          title: "Godzilla x Kong: The New Empire",
          overview:
            "Godzilla and Kong face a colossal undiscovered threat hidden within our world.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/j3Z3XktmWB1VhsS8iXNcrR86PXi.jpg",
          original_title: "Godzilla x Kong: The New Empire",
          original_language: "en",
          release_date: new Date("2024-03-27"),
          genres: [
            { id: "28", name: "Action" },
            { id: "878", name: "Science Fiction" },
            { id: "12", name: "Adventure" },
          ],
        },
        {
          id: "1011985",
          media_type: "movie",
          title: "Kung Fu Panda 4",
          overview:
            "Po is tapped to become the Spiritual Leader of the Valley of Peace, but before that he must find and train a new Dragon Warrior.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg",
          original_title: "Kung Fu Panda 4",
          original_language: "en",
          release_date: new Date("2024-03-02"),
          genres: [
            { id: "16", name: "Animation" },
            { id: "10751", name: "Family" },
            { id: "35", name: "Comedy" },
          ],
        },
      ],
    },
  ],
};

export const mockMoviesContentLists: IContentListResponse = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      id: "CD1",
      title: "Recommended for you",
      showProgress: false,
      contents: [
        {
          id: "693134",
          media_type: "movie",
          title: "Dune: Part Two",
          overview:
            "Paul Atreides unites with the Fremen while seeking revenge against the conspirators who destroyed his family.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/6e7sf5Xz5L1Q9Ozr7XvY0Yt2rH6.jpg",
          original_title: "Dune: Part Two",
          original_language: "en",
          release_date: new Date("2024-02-27"),
          currentViewTime: 4200,
          duration: 9300,
          genres: [
            { id: "878", name: "Science Fiction" },
            { id: "12", name: "Adventure" },
            { id: "28", name: "Action" },
          ],
        },
        {
          id: "872585",
          media_type: "movie",
          title: "Oppenheimer",
          overview:
            "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
          original_title: "Oppenheimer",
          original_language: "en",
          release_date: new Date("2023-07-19"),
          currentViewTime: 3000,
          duration: 10800,
          genres: [
            { id: "18", name: "Drama" },
            { id: "36", name: "History" },
            { id: "53", name: "Thriller" },
          ],
        },
        {
          id: "569094",
          media_type: "movie",
          title: "Spider-Man: Across the Spider-Verse",
          overview:
            "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
          original_title: "Spider-Man: Across the Spider-Verse",
          original_language: "en",
          release_date: new Date("2023-05-31"),
          currentViewTime: 900,
          duration: 8400,
          genres: [
            { id: "16", name: "Animation" },
            { id: "28", name: "Action" },
            { id: "878", name: "Science Fiction" },
          ],
        },
        {
          id: "603692",
          media_type: "movie",
          title: "John Wick: Chapter 4",
          overview:
            "John Wick uncovers a path to defeating The High Table, but must face powerful new enemies across the globe.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
          original_title: "John Wick: Chapter 4",
          original_language: "en",
          release_date: new Date("2023-03-22"),
          currentViewTime: 2500,
          duration: 10140,
          genres: [
            { id: "28", name: "Action" },
            { id: "53", name: "Thriller" },
            { id: "80", name: "Crime" },
          ],
        },
      ],
    },
    {
      id: "CD2",
      title: "Trending Now",
      showProgress: false,
      contents: [
        {
          id: "533535",
          media_type: "movie",
          title: "Deadpool & Wolverine",
          overview:
            "Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits Wolverine to save his universe.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg",
          original_title: "Deadpool & Wolverine",
          original_language: "en",
          release_date: new Date("2024-07-24"),
          genres: [
            { id: "28", name: "Action" },
            { id: "35", name: "Comedy" },
            { id: "878", name: "Science Fiction" },
          ],
        },
        {
          id: "786892",
          media_type: "movie",
          title: "Furiosa: A Mad Max Saga",
          overview:
            "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great biker horde.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/1m1rXopfNDVL3UMiv6kriYaJ3yE.jpg",
          original_title: "Furiosa: A Mad Max Saga",
          original_language: "en",
          release_date: new Date("2024-05-22"),
          genres: [
            { id: "28", name: "Action" },
            { id: "12", name: "Adventure" },
            { id: "878", name: "Science Fiction" },
          ],
        },
        {
          id: "823464",
          media_type: "movie",
          title: "Godzilla x Kong: The New Empire",
          overview:
            "Godzilla and Kong face a colossal undiscovered threat hidden within our world.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/j3Z3XktmWB1VhsS8iXNcrR86PXi.jpg",
          original_title: "Godzilla x Kong: The New Empire",
          original_language: "en",
          release_date: new Date("2024-03-27"),
          genres: [
            { id: "28", name: "Action" },
            { id: "878", name: "Science Fiction" },
            { id: "12", name: "Adventure" },
          ],
        },
        {
          id: "1011985",
          media_type: "movie",
          title: "Kung Fu Panda 4",
          overview:
            "Po is tapped to become the Spiritual Leader of the Valley of Peace, but before that he must find and train a new Dragon Warrior.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg",
          original_title: "Kung Fu Panda 4",
          original_language: "en",
          release_date: new Date("2024-03-02"),
          genres: [
            { id: "16", name: "Animation" },
            { id: "10751", name: "Family" },
            { id: "35", name: "Comedy" },
          ],
        },
      ],
    },
  ],
};

export const mockSeriesContentLists: IContentListResponse = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      id: "SD1",
      title: "Recommended Series For You",
      showProgress: true,
      contents: [
        {
          id: "1396",
          media_type: "tv",
          title: "Breaking Bad",
          overview:
            "A high school chemistry teacher turned methamphetamine producer navigates the dangers of the criminal underworld while trying to secure his family's future.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
          original_title: "Breaking Bad",
          original_language: "en",
          release_date: new Date("2008-01-20"),
          currentViewTime: 2100,
          duration: 3600,
          genres: [
            { id: "18", name: "Drama" },
            { id: "80", name: "Crime" },
            { id: "53", name: "Thriller" },
          ],
        },
        {
          id: "82856",
          media_type: "tv",
          title: "The Mandalorian",
          overview:
            "After the fall of the Galactic Empire, a lone gunfighter makes his way through the outer reaches of the galaxy.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/9ijMGlJKqcslswWUzTEwScm82Gs.jpg",
          original_title: "The Mandalorian",
          original_language: "en",
          release_date: new Date("2019-11-12"),
          currentViewTime: 900,
          duration: 2700,
          genres: [
            { id: "10765", name: "Sci-Fi & Fantasy" },
            { id: "10759", name: "Action & Adventure" },
            { id: "37", name: "Western" },
          ],
        },
        {
          id: "66732",
          media_type: "tv",
          title: "Stranger Things",
          overview:
            "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
          original_title: "Stranger Things",
          original_language: "en",
          release_date: new Date("2016-07-15"),
          currentViewTime: 1500,
          duration: 3300,
          genres: [
            { id: "18", name: "Drama" },
            { id: "9648", name: "Mystery" },
            { id: "10765", name: "Sci-Fi & Fantasy" },
          ],
        },
        {
          id: "94997",
          media_type: "tv",
          title: "House of the Dragon",
          overview:
            "The story of House Targaryen, set nearly 200 years before the events of Game of Thrones.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
          original_title: "House of the Dragon",
          original_language: "en",
          release_date: new Date("2022-08-21"),
          currentViewTime: 600,
          duration: 3600,
          genres: [
            { id: "10765", name: "Sci-Fi & Fantasy" },
            { id: "18", name: "Drama" },
            { id: "10759", name: "Action & Adventure" },
          ],
        },
        {
          id: "60625",
          media_type: "tv",
          title: "Rick and Morty",
          overview:
            "An animated series that follows the exploits of a super scientist and his not-so-bright grandson.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg",
          original_title: "Rick and Morty",
          original_language: "en",
          release_date: new Date("2013-12-02"),
          currentViewTime: 1200,
          duration: 1320,
          genres: [
            { id: "16", name: "Animation" },
            { id: "35", name: "Comedy" },
            { id: "10765", name: "Sci-Fi & Fantasy" },
          ],
        },
      ],
    },
    {
      id: "SD2",
      title: "Trending Series This Week",
      showProgress: false,
      contents: [
        {
          id: "2316",
          media_type: "tv",
          title: "The Office",
          overview:
            "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/9ijMGlJKqcslswWUzTEwScm82Gs.jpg",
          original_title: "The Office",
          original_language: "en",
          release_date: new Date("2005-03-24"),
          genres: [{ id: "35", name: "Comedy" }],
        },
        {
          id: "76479",
          media_type: "tv",
          title: "The Boys",
          overview:
            "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/7Ns6tO3aYjppI5j8IuSxkN9zH1N.jpg",
          original_title: "The Boys",
          original_language: "en",
          release_date: new Date("2019-07-25"),
          genres: [
            { id: "10765", name: "Sci-Fi & Fantasy" },
            { id: "10759", name: "Action & Adventure" },
            { id: "80", name: "Crime" },
          ],
        },
        {
          id: "94605",
          media_type: "tv",
          title: "Arcane",
          overview:
            "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magical technologies and clashing convictions.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/6Xf6h0q4tU9Yb8jvR9jM7G7Q5mB.jpg",
          original_title: "Arcane",
          original_language: "en",
          release_date: new Date("2021-11-06"),
          genres: [
            { id: "16", name: "Animation" },
            { id: "18", name: "Drama" },
            { id: "10765", name: "Sci-Fi & Fantasy" },
          ],
        },
        {
          id: "93405",
          media_type: "tv",
          title: "Squid Game",
          overview:
            "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize, unaware of the deadly stakes.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/qjGrUmKW78MCFG8PTLDBp67S27p.jpg",
          original_title: "오징어 게임",
          original_language: "ko",
          release_date: new Date("2021-09-17"),
          genres: [
            { id: "18", name: "Drama" },
            { id: "9648", name: "Mystery" },
            { id: "80", name: "Crime" },
          ],
        },
        {
          id: "110492",
          media_type: "tv",
          title: "Peacemaker",
          overview:
            "The story of a uniquely patriotic vigilante who believes in peace at any cost, no matter how many people he has to kill to get it.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/hE3LRZAY84fG19a18pzpkZERjTE.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/ctxm191q5o3axFzQsvNPlbKoSYv.jpg",
          original_title: "Peacemaker",
          original_language: "en",
          release_date: new Date("2022-01-13"),
          genres: [
            { id: "10759", name: "Action & Adventure" },
            { id: "35", name: "Comedy" },
            { id: "10765", name: "Sci-Fi & Fantasy" },
          ],
        },
      ],
    },
  ],
};

export const mockKidsContentLists: IContentListResponse = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      id: "KD1",
      title: "Kids Favorites",
      showProgress: true,
      contents: [
        {
          id: "82728",
          media_type: "tv",
          title: "Bluey",
          overview:
            "Bluey is an energetic Australian Blue Heeler puppy who lives with her dad, mum, and little sister Bingo, turning everyday family life into playful adventures.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/9f5J4aPZ2vPZy9dZYkTfLZNVVRP.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/5m8yYy5Yy7k3tVZzYpUeZ7k7k3K.jpg",
          original_title: "Bluey",
          original_language: "en",
          release_date: new Date("2018-10-01"),
          currentViewTime: 420,
          duration: 480,
          genres: [
            { id: "16", name: "Animation" },
            { id: "10751", name: "Family" },
            { id: "10762", name: "Kids" },
          ],
        },
        {
          id: "75214",
          media_type: "tv",
          title: "Paw Patrol",
          overview:
            "A group of heroic puppies led by a tech-savvy boy work together to protect the citizens of Adventure Bay.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/w8uW5G5XvJ5G5b9tXW1F1Z7kG7.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/2ZkKX5nZK5p9Z5FZ7p8F9Z5KZK.jpg",
          original_title: "PAW Patrol",
          original_language: "en",
          release_date: new Date("2013-08-12"),
          currentViewTime: 300,
          duration: 660,
          genres: [
            { id: "16", name: "Animation" },
            { id: "10762", name: "Kids" },
            { id: "10759", name: "Action & Adventure" },
          ],
        },
        {
          id: "456",
          media_type: "tv",
          title: "SpongeBob SquarePants",
          overview:
            "The misadventures of a talking sea sponge who lives in a pineapple under the sea.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/6xgZ9Q5t5MZJ5ZQ9n5x5KZ5ZK5.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/3GZ5tZKZ5Z5Z5F5ZK5ZK5ZK5Z.jpg",
          original_title: "SpongeBob SquarePants",
          original_language: "en",
          release_date: new Date("1999-05-01"),
          currentViewTime: 600,
          duration: 660,
          genres: [
            { id: "16", name: "Animation" },
            { id: "35", name: "Comedy" },
            { id: "10762", name: "Kids" },
          ],
        },
      ],
    },
    {
      id: "KD2",
      title: "Fun & Adventure for Kids",
      showProgress: false,
      contents: [
        {
          id: "12971",
          media_type: "tv",
          title: "Avatar: The Last Airbender",
          overview:
            "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous quest to fulfill his destiny as the Avatar.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/2JqJ1B1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z.jpg",
          original_title: "Avatar: The Last Airbender",
          original_language: "en",
          release_date: new Date("2005-02-21"),
          genres: [
            { id: "16", name: "Animation" },
            { id: "10759", name: "Action & Adventure" },
            { id: "10765", name: "Sci-Fi & Fantasy" },
          ],
        },
        {
          id: "4629",
          media_type: "tv",
          title: "Teenage Mutant Ninja Turtles",
          overview:
            "Four mutant turtle brothers fight evil in New York City while learning the value of teamwork and family.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/7Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/9Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z.jpg",
          original_title: "Teenage Mutant Ninja Turtles",
          original_language: "en",
          release_date: new Date("2012-09-29"),
          genres: [
            { id: "16", name: "Animation" },
            { id: "10759", name: "Action & Adventure" },
            { id: "10762", name: "Kids" },
          ],
        },
        {
          id: "4614",
          media_type: "tv",
          title: "Pokémon",
          overview:
            "Join Ash Ketchum and his partner Pikachu as they travel across regions, battling rivals and striving to become Pokémon Masters.",
          poster_path:
            "https://image.tmdb.org/t/p/w500/rOuGm07PxBhEsK9TaGPRQVJQm1X.jpg",
          backdrop_path:
            "https://image.tmdb.org/t/p/w1280/9f5ZgZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z.jpg",
          original_title: "ポケットモンスター",
          original_language: "ja",
          release_date: new Date("1997-04-01"),
          genres: [
            { id: "16", name: "Animation" },
            { id: "10759", name: "Action & Adventure" },
            { id: "10762", name: "Kids" },
          ],
        },
      ],
    },
  ],
};
