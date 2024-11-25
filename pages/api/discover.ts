import TMDBClient from '../../app/clients/TMDBclient';

export default async function handler(req: any, res: any){
  try {
    const {
        include_adult,
        include_video,
        language,
        page,
        sort_by,
        with_genres,
        without_genres,
        with_original_language,
    } = req.query;

    const release_date_gte = req.query['release_date.gte'];
    const release_date_lte = req.query['release_date.lte'];
    const vote_average_gte = req.query['vote_average.gte'];

    const queryParams = {
        include_adult,
        include_video,
        language,
        page,
        sort_by,
        with_genres,
        without_genres,
        with_original_language,
        'release_date.gte': release_date_gte,
        'release_date.lte': release_date_lte,
        'vote_average.gte': vote_average_gte,
    }
    
    const response = await TMDBClient.get('/discover/movie', {
        params: queryParams
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};