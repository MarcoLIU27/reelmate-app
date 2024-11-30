import { NextRequest, NextResponse } from 'next/server';
import TMDBClient from '@/app/clients/TMDBclient';

// Fetch movie details and keywords from TMDB
export async function GET(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params; // Extract the movie ID from the parameters

  try {
    // Fetch movie details from TMDB
    const { data: details } = await TMDBClient.get(`/movie/${id}`);

    // Fetch movie keywords from TMDB
    const { data: keywords } = await TMDBClient.get(`/movie/${id}/keywords`);

    // Return the details and keywords
    return NextResponse.json({ details, keywords }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.status_message || 'Failed to fetch movie details from TMDB',
      },
      { status: error.response?.status || 500 }
    );
  }
}
