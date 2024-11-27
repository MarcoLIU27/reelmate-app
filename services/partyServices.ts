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
  newStatus: 'unvoted' | 'liked' | 'shortlisted' | 'skipped'
) {
  try {
    // Construct the update query
    const updateQuery: any = {
      $set: { 'moviePool.$.status': newStatus }
    };

    // Add to shortlist if status is 'shortlisted'
    if (newStatus === 'shortlisted') {
      updateQuery.$addToSet = { shortlist: movieId };
    }

    // Perform the update
    const updatedParty = await Party.findOneAndUpdate(
      { 
        _id: partyId, 
        'moviePool.movieId': movieId 
      },
      updateQuery,
      { 
        new: true,  // Return the updated document
        runValidators: true  // Run model validations
      }
    );

    if (!updatedParty) {
      throw new Error(`No party found with ID ${partyId} and movie ID ${movieId}`);
    }

    return updatedParty;
  } catch (error) {
    console.error('Error updating movie status:', error);
    throw error;
  }
}
