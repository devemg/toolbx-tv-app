export type MediaType = "movie" | "tv";

export interface IContentGenre {
  id: string;
  name: string;
  backdrop_path?: string;
  poster_path?: string;
}

export interface IContent {
  id: string;
  media_type: MediaType;
  title: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  original_language: string;
  release_date: Date;
  duration?: number; // in seconds
  currentViewTime?: number; // in seconds
  genres?: IContentGenre[];
}

export interface IContentResponse {
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}
