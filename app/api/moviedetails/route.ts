import { NextRequest, NextResponse } from 'next/server';
import TMDBClient from '@/app/clients/TMDBclient'; // Adjust import path if necessary

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters
    const movie_id = searchParams.get('movie_id');

    // Make the request to TMDB
    const details = await TMDBClient.get(`/movie/${movie_id}`);

    const keywords = await TMDBClient.get(`/movie/${movie_id}/keywords`);

    // Return the response data
    return NextResponse.json({ details, keywords });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
  }
}
