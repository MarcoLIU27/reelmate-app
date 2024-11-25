import clientPromise from '@/clients/mongodb';
import { ObjectId } from 'mongodb';

const dbName = 'reelmatesdb';
const collectionName = 'party';

export async function createParty(data: any) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db.collection(collectionName).insertOne(data);
  return result.insertedId;
}

export async function updatePartyStatus(partyId: string, status: string) {
  const client = await clientPromise;
  const db = client.db(dbName);
  await db.collection(collectionName).updateOne(
    { _id: new ObjectId(partyId) },
    { $set: { status } }
  );
}

export async function getPartyById(partyId: string) {
  const client = await clientPromise;
  const db = client.db(dbName);
  return await db.collection(collectionName).findOne({ _id: new ObjectId(partyId) });
}
