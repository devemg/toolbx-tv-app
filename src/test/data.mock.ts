import type { IContent, IContentResponse } from "@/models/content";

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
        id: '18',
        name: "Drama"
      }, {
        id: '80',
        name: "Crime"
      }
    ]
  }

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
          id: '18',
          name: "Drama"
        },
        {
          id: '80',
          name: "Crime"
        }
      ]
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
      duration: 9120
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
      duration: 3600
    }
  ]
};
