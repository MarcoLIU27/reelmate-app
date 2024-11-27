import Party, { Parties } from '@/models/party';

export async function createParty(data: Partial<Omit<Parties, '_id'>>) {
  const newParty = new Party(data);
  const savedParty = await newParty.save();
  return savedParty._id; // Return the generated _id
}

export async function getPartyByID(id: string) {
  const party = await Party.findById(id).exec();
  return party;
}

export async function updateMovieStatusInParty(
  partyId: string,
  movieId: string,
  newStatus: string
) {
  try {
    // Find the party and update the status of the movie in moviePool
    const updatedParty = await Party.findOneAndUpdate(
      { _id: partyId, 'moviePool.movieId': movieId },
      { $set: { 'moviePool.$.status': newStatus } }, // `$` is used to target the specific array element
      { new: true } // Return the updated document
    );

    return updatedParty;
  } catch (error) {
    console.error('Error updating movie status:', error);
    throw error;
  }
}