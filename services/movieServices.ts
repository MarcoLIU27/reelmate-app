import Movie, { Movies } from '@/models/movie';

export async function createMovie(data: Partial<Omit<Movies, '_id'>>) {
  const newMovie = new Movie(data);
  const savedMovie = await newMovie.save();
  return savedMovie._id; // Return the generated _id
}

export async function getMovieByID(movieId: string) {
  const movie = await Movie.findById(movieId).exec();
  return movie;
}

export async function getMovieByTMDBId(tmdbId: string) {
  const movie = await Movie.findOne({ tmdbId }).exec();
  return movie;
}
