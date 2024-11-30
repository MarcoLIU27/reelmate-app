import { NextRequest, NextResponse } from 'next/server';
import TMDBClient from '@/app/clients/TMDBclient';

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;
  const body = await req.json();
  const { preferenceData, poolHistory } = body;

  try {
    // Make the request to TMDB
    const responseRecommend = await TMDBClient.get(`/movie/${id}/recommendations`);
    const recommend = responseRecommend.data.results;

    const responseSimilar = await TMDBClient.get(`/movie/${id}/similar`);
    const similar = responseSimilar.data.results;

    const recommendations = recommend.concat(similar);

    // Convert string filters to arrays for easier handling
    const withGenresArray = preferenceData.with_genres ? preferenceData.with_genres.split('|') : [];
    const withoutGenresArray = preferenceData.without_genres
      ? preferenceData.without_genres.split(',')
      : [];
    const withLanguagesArray = preferenceData.with_original_language
      ? preferenceData.with_original_language.split('|')
      : [];

    // Filter recommendations by user preferences
    const filteredRecommendations = recommendations
      .filter((movie: any) => {
        const movieGenres = movie.genre_ids || [];
        const matchesWithGenres =
          withGenresArray.length === 0 ||
          withGenresArray.some((genre: string) => movieGenres.includes(Number(genre)));
        const matchesWithoutGenres =
          withoutGenresArray.length === 0 ||
          !withoutGenresArray.some((genre: string) => movieGenres.includes(Number(genre)));
        const matchesLanguage =
          withLanguagesArray.length === 0 || withLanguagesArray.includes(movie.original_language);
        const releaseDate = new Date(movie.release_date);
        const matchesReleaseDateGte = releaseDate >= new Date(preferenceData['release_date.gte']);
        const matchesReleaseDateLte = releaseDate <= new Date(preferenceData['release_date.lte']);
        const matchesVoteAverage =
          movie.vote_average >= parseFloat(preferenceData['vote_average.gte']);
        const notInPoolHistory = !poolHistory.includes(movie.id.toString());

        return (
          matchesWithGenres &&
          matchesWithoutGenres &&
          matchesLanguage &&
          matchesReleaseDateGte &&
          matchesReleaseDateLte &&
          matchesVoteAverage &&
          notInPoolHistory
        );
      })
      .map((movie: any) => ({ id: movie.id }))
      .slice(0, 3);

    // Return the filtered recommendations
    return NextResponse.json({
      recommendations: filteredRecommendations,
      numResults: filteredRecommendations.length,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
  }
}
