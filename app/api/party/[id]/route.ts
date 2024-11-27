import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/clients/mongodb';
import { getPartyByID, updateMovieStatusInParty } from '@/services/partyServices';


export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await dbConnect();

  const { id } = params;

  try {
    // Fetch the movie by its ID from MongoDB
    const party = await getPartyByID(id);

    if (!party) {
      return NextResponse.json({ message: 'Party not found' }, { status: 404 });
    }

    // Filter the moviePool for unvoted/shortlisted movies
    const unvotedMovies = party.moviePool.filter(
      (movie: { status: string }) => movie.status === 'unvoted'
    );

    const shortlistedMovies = party.moviePool.filter(
      (movie: { status: string }) => movie.status === 'shortlisted'
    );

    // Extract the total unvoted count, total shortlisted count and the first unvoted movie ID
    const totalUnvoted = unvotedMovies.length;
    const totalShortlisted = shortlistedMovies.length;
    const firstUnvotedMovieId = totalUnvoted > 0 ? unvotedMovies[0].movieId : null;

    // Return the result
    return NextResponse.json({
      totalUnvoted,
      totalShortlisted,
      firstUnvotedMovieId,
    });
    } catch (error: any) {
    console.error('Error retrieving party data:', error);
    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  await dbConnect();

  try {
    // Parse the request body
    const body = await req.json();
    const { movieId, status } = body;

    // Validate required fields
    if (!movieId || !status) {
      return NextResponse.json({ message: 'movieId and status are required' }, { status: 400 });
    }

    // Update the movie status in the party
    const updatedParty = await updateMovieStatusInParty(id, movieId, status);

    if (!updatedParty) {
      return NextResponse.json({ message: 'Party or movie not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Movie status updated successfully' });
  } catch (error: any) {
    console.error('Error updating movie status:', error);
    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
