import TMDBClient from '../../app/clients/TMDBclient';

export default async function handler(req, res){
  try {
    const {
        include_adult,
        include_video,
        language,
        page,
        sort_by,
        with_genres,
        without_genres
    } = req.query;
    const queryParams = {
        include_adult,
        include_video,
        language,
        page,
        sort_by,
        with_genres,
        without_genres
    }
    const response = await TMDBClient.get('/discover/movie', {
        params: queryParams
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};