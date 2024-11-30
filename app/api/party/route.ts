import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/clients/mongodb';
import { createParty } from '@/services/partyServices';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    // Parse the request body
    const body = await req.json();

    // Validate required parameters
    const requiredFields = [
      'genres',
      'excludedGenres',
      'languages',
      'yearStart',
      'yearEnd',
      'highVoteOnly',
      'moviePool',
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 });
      }
    }

    // Create the party in the database
    const partyId = await createParty({
      createdAt: new Date(),
      status: 'collecting',
      preferences: {
        genres: body.genres,
        excludedGenres: body.excludedGenres,
        languages: body.languages,
        yearRange: {
          start: body.yearStart,
          end: body.yearEnd,
        },
        poolSize: 10,
        highVoteOnly: body.highVoteOnly,
      },
      moviePool: body.moviePool,
    });
    // console.log('New party created with ID:', partyId);

    // Return the created party ID
    return NextResponse.json({ partyId });
  } catch (error: any) {
    // console.error('Error creating party:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
