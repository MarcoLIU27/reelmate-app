import { NextRequest, NextResponse } from 'next/server';
import TMDBClient from '@/app/clients/TMDBclient'; // Adjust import path if necessary

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters
    const include_adult = searchParams.get('include_adult');
    const include_video = searchParams.get('include_video');
    const language = searchParams.get('language');
    const page = searchParams.get('page');
    const sort_by = searchParams.get('sort_by');
    const with_genres = searchParams.get('with_genres');
    const without_genres = searchParams.get('without_genres');
    const with_original_language = searchParams.get('with_original_language');
    const release_date_gte = searchParams.get('release_date.gte');
    const release_date_lte = searchParams.get('release_date.lte');
    const vote_average_gte = searchParams.get('vote_average.gte');

    // Construct query parameters for TMDB API
    const queryParams = {
      include_adult,
      include_video,
      language,
      page,
      sort_by,
      with_genres,
      without_genres,
      with_original_language,
      'release_date.gte': release_date_gte,
      'release_date.lte': release_date_lte,
      'vote_average.gte': vote_average_gte,
    };

    // Make the request to TMDB
    const response = await TMDBClient.get('/discover/movie', {
      params: queryParams,
    });

    // Return the response data
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
