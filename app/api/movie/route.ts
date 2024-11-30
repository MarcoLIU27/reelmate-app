import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/clients/mongodb';
import { createMovie } from '@/services/movieServices';

// Movie endpoints: create with ReelMates DB Movie Collection

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    // Parse the request body
    const body = await req.json();

    // Validate required parameters
    const requiredFields = [
      'tmdbId',
      'title',
      'originalTitle',
      'genres',
      'language',
      'countries',
      'overview',
      'releaseDate',
      'runtime',
      'adult',
      'tagline',
      'keywords',
      'voteAverage',
      'voteCount',
      'popularity',
      'posterPath',
      'backdropPath',
      'dominantColor',
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 });
      }
    }

    // Create the party in the database
    const movieId = await createMovie({
      tmdbId: body.tmdbId,
      title: body.title,
      originalTitle: body.originalTitle || '',
      genres: body.genres,
      language: body.language,
      countries: body.countries || [],
      overview: body.overview || '',
      releaseDate: body.releaseDate,
      runtime: body.runtime,
      adult: body.adult || false,
      tagline: body.tagline || '',
      keywords: body.keywords || [],
      voteAverage: body.voteAverage,
      voteCount: body.voteCount,
      popularity: body.popularity,
      posterPath: body.posterPath,
      backdropPath: body.backdropPath || '',
      dominantColor: body.dominantColor || [],
      createdAt: new Date(),
      expiresAt: body.expiresAt || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Default expiry: 3 days
    });
    //console.log('New movie created with ID:', movieId);

    // Return the created movie ID
    return NextResponse.json({ movieId });
  } catch (error: any) {
    //console.error('Error creating party:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
