import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/clients/mongodb';
import { getMovieByTMDBId } from '@/services/movieServices';


export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await dbConnect();

  const { id } = params;

  try {
    // Fetch the movie by TMDB ID
    const movie = await getMovieByTMDBId(id);

    if (!movie) {
      return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
    }

    // Return the movie data
    return NextResponse.json(movie, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching movie:', error);
    return NextResponse.json(
      { message: 'Failed to fetch movie', error: error.message },
      { status: 500 }
    );
  }
}
