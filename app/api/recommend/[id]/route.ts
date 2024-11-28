import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/clients/mongodb';
import TMDBClient from '@/app/clients/TMDBclient';

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await dbConnect();

  const { id } = params;
  const body = await req.json();
  const {
    with_genres,
    without_genres,
    with_original_language,
    'release_date.gte': releaseDateGte,
    'release_date.lte': releaseDateLte,
    'vote_average.gte': voteAverageGte,
  } = body;

  try {
    // Make the request to TMDB
    const response = await TMDBClient.get(`/movie/${id}/recommendations`);
    const recommendations = response.data.results;

    // Convert string filters to arrays for easier handling
    const withGenresArray = with_genres ? with_genres.split('|') : [];
    const withoutGenresArray = without_genres ? without_genres.split(',') : [];
    const withLanguagesArray = with_original_language ? with_original_language.split('|') : [];

    // Filter recommendations by user preferences
    const filteredRecommendations = recommendations
      .filter((movie: any) => {
        const movieGenres = movie.genre_ids || [];
        const matchesWithGenres =
          withGenresArray.length === 0 || withGenresArray.some((genre: string) => movieGenres.includes(Number(genre)));
        const matchesWithoutGenres =
          withoutGenresArray.length === 0 || !withoutGenresArray.some((genre: string) => movieGenres.includes(Number(genre)));
        const matchesLanguage =
          withLanguagesArray.length === 0 || withLanguagesArray.includes(movie.original_language);
        const releaseDate = new Date(movie.release_date);
        const matchesReleaseDateGte = releaseDate >= new Date(releaseDateGte);
        const matchesReleaseDateLte = releaseDate <= new Date(releaseDateLte);
        const matchesVoteAverage = movie.vote_average >= parseFloat(voteAverageGte);

        return (
          matchesWithGenres &&
          matchesWithoutGenres &&
          matchesLanguage &&
          matchesReleaseDateGte &&
          matchesReleaseDateLte &&
          matchesVoteAverage
        );
      })
      .map((movie: any) => ({ id: movie.id }))
      .slice(0, 3);

    // Return the filtered recommendations
    return NextResponse.json({ recommendations: filteredRecommendations, numResults: filteredRecommendations.length });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
  }
}
