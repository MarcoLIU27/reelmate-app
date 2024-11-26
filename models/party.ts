import mongoose, { Document, Schema } from 'mongoose';

export interface Parties extends Document {
  createdAt: Date;
  status: 'collecting' | 'voting' | 'completed';
  preferences: {
    genres: string[];
    excludedGenres: string[];
    languages: string[];
    yearRange: {
      start: string;
      end: string;
    };
    poolSize: number;
    highVoteOnly: boolean;
  };
  moviePool: {
    movieId: string;
    status: 'unvoted' | 'watched' | 'shortlisted' | 'skipped';
  }[];
  shortlist: {
    movieId: string;
    status: 'unvoted' | 'shortlisted' | 'skipped';
  }[];
  winner?: string;
  completedAt?: Date;
}

// Define the Party schema
const PartySchema: Schema = new Schema<Parties>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['collecting', 'voting', 'completed'],
    required: true,
  },
  preferences: {
    genres: {
      type: [String],
      required: true,
    },
    excludedGenres: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      required: true,
    },
    yearRange: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    poolSize: {
      type: Number,
      required: true,
    },
    highVoteOnly: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  moviePool: [
    {
      movieId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['unvoted', 'watched', 'shortlisted', 'skipped'],
        required: true,
      },
    },
  ],
  shortlist: [
    {
      movieId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['unvoted', 'shortlisted', 'skipped'],
        required: true,
      },
    },
  ],
  winner: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
});

// Create and export the Party model
export default mongoose.models.Party || mongoose.model<Parties>('Party', PartySchema);
