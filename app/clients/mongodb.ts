import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

// Define a type for the mongoose cache
interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// Access or initialize the global cache directly
const globalCache: { mongoose?: MongooseCache } = globalThis as any;

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  const cached = globalCache.mongoose!;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'reelmatesdb',
    };
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
