import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Movies extends Document {
  tmdbId: string; // TMDB movie ID
  title: string;
  originalTitle: string;
  genres: string[];
  language: string;
  countries: string[];
  overview: string;
  releaseDate: string;
  runtime: number;
  adult: boolean;
  tagline: string;
  keywords: string[];
  voteAverage: number;
  voteCount: number;
  popularity: number;
  posterPath: string;
  backdropPath: string;
  dominantColor: number[];
  createdAt: Date;
  expiresAt: Date;
}

const MovieSchema: Schema = new Schema<Movies>({
  tmdbId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
  },
  genres: {
    type: [String],
    default: [],
  },
  language: {
    type: String,
    required: true,
  },
  countries: {
    type: [String],
    default: [],
  },
  overview: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  runtime: {
    type: Number,
  },
  adult: {
    type: Boolean,
    default: false,
  },
  tagline: {
    type: String,
  },
  keywords: {
    type: [String],
    default: [],
  },
  voteAverage: {
    type: Number,
    default: 0,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  posterPath: {
    type: String,
  },
  backdropPath: {
    type: String,
  },
  dominantColor: {
    type: [Number], // RGB values as an array
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

MovieSchema.index({ tmdbId: 1 });

// Create and export the Movie model
export default mongoose.models.Movie || mongoose.model<Movies>('Movie', MovieSchema);
