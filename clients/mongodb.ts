import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error('Please add your Mongo URI to the .env file');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  // Use a global variable in development to prevent creating multiple instances
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production, always create a new client
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export default clientPromise;
