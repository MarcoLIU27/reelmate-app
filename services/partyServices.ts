import Party, { Parties } from '@/models/party';

export async function createParty(data: Partial<Omit<Parties, '_id'>>) {
  const newParty = new Party(data);
  const savedParty = await newParty.save();
  return savedParty._id; // Return the generated _id
}
