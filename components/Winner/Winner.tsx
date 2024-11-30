'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Paper, Text, Title } from '@mantine/core';
import classes from './Winner.module.css';
import { calculateDominantColor } from '@/components/Questions/Questions';

const getCachedData = (key: string) => {
  const cached = sessionStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

export function Winner() {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

  const [loading, setLoading] = useState(true);
  const [loadingText, _setLoadingText] = useState<string>('Loading final pick...');
  const [currentMovieId, setCurrentMovieId] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [backdropUrl, setBackdropUrl] = useState<string>('');
  const [gradient, setGradient] = useState('');
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/start');
  };

  const fetchMovieData = async () => {
    // Try to get local cache first
    const cachedData = getCachedData(currentMovieId!);
    if (cachedData == null) {
      const movieDetailsRes = await fetch(`/api/moviedetails/${currentMovieId}`);
      if (!movieDetailsRes.ok) {
        throw new Error(`Failed to fetch movie ${currentMovieId}`);
      }
      const movieDetails = await movieDetailsRes.json();

      // Calculate dominantColor for backdrop image
      const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';
      const posterUrl = `${BASE_IMAGE_URL}/w780${movieDetails.details.poster_path}`;
      const proxiedPosterUrl = `/api/proxy?url=${encodeURIComponent(posterUrl)}`;

      let dominantColor: number[] | null = null;
      dominantColor = await calculateDominantColor(proxiedPosterUrl);
      if (!dominantColor) {
        throw new Error('No dominant color extracted.');
      }

      const createMovieBody = {
        tmdbId: movieDetails.details.id.toString(),
        title: movieDetails.details.title,
        originalTitle: movieDetails.details.original_title,
        genres: movieDetails.details.genres.map((genre: any) => genre.name),
        language: movieDetails.details.original_language,
        countries: movieDetails.details.origin_country,
        overview: movieDetails.details.overview,
        releaseDate: movieDetails.details.release_date,
        runtime: movieDetails.details.runtime,
        adult: movieDetails.details.adult,
        tagline: movieDetails.details.tagline,
        keywords: movieDetails.keywords.keywords.map((keyword: any) => keyword.name),
        voteAverage: movieDetails.details.vote_average,
        voteCount: movieDetails.details.vote_count,
        popularity: movieDetails.details.popularity,
        posterPath: movieDetails.details.poster_path,
        backdropPath: movieDetails.details.backdrop_path,
        dominantColor,
      };
      setMovieData(createMovieBody);
    } else {
      setMovieData(cachedData);
    }
  };

  // Get winner movie ID
  useEffect(() => {
    setLoading(true);
    const winnerId = getCachedData("winner");
    if (winnerId) {
      setCurrentMovieId(winnerId);
    }
  }, []);


  useEffect(() => {
    if (currentMovieId) {
      fetchMovieData();
    }
  }, [currentMovieId]);

  // Set the gradient dynamically when the dominant color is extracted
  useEffect(() => {
    if (movieData) {
      // console.log("data:", movieData);
      // Extract the RGB values from the dominant color
      const [r, g, b] = movieData.dominantColor;

      const gradient = `linear-gradient(
        to bottom,
        rgba(${r}, ${g}, ${b}, 1) 0%,
        rgba(${r}, ${g}, ${b}, 0.5) 55%,
        rgba(255, 255, 255, 1) 95%
      )`;
      setGradient(gradient);
      setPosterUrl(`${BASE_IMAGE_URL}/w780${movieData.posterPath}`);
      setBackdropUrl(`${BASE_IMAGE_URL}/w1280${movieData.backdropPath}`);
      setLoading(false);
    }
  }, [movieData]);

  return (
    <>
      <Paper
        radius="xl"
        style={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {loading ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader color="pink" size="xl" type="dots" />
            <Text size="xl">{loadingText}</Text>
          </div>
        ) : (
          <div
            className={classes.outterContainer}
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className={classes.glassEffect}>
              <div className={classes.innerContainer} style={{ backgroundImage: gradient }}>
                  <Title size="3rem" c="white" mb="4rem" > Congrats!🥳 You have a great pick! </Title>
                <div className={classes.content}>
                  {/* Left Section - Poster */}
                  <div >
                    <Image
                      src={posterUrl}
                      alt={movieData.title}
                      radius="lg"
                      className={classes.poster}
                    />
                  </div>
                  {/* Right Section - Details */}
                  <div style={{ paddingLeft: '2rem' }}>

                      {/* Title and year */}
                      <Title order={1} fz="3.5rem" style={{ color: 'white' }}>
                        {movieData.title}{' '}
                        <Text component="span" fz="3rem" color="white">
                          ({movieData.releaseDate?.substr(0, 4)})
                        </Text>
                      </Title>
                      {/* User Score and metadata*/}
                      <Group mt="md" gap="sm">
                        <Badge
                          size="lg"
                          color="green"
                          radius="xl"
                          style={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          {Math.round(movieData.voteAverage * 10)}%
                        </Badge>
                        <Text fz="1.1rem" color="white">
                        {movieData.countries.join(', ')} • {movieData.genres.join(', ')} •{' '}
                        {movieData.runtime} min
                      </Text>
                      </Group>

                      {/* Overview */}
                      <Text fw={700} size="xl" color="white" className={classes.tagline}>
                        {movieData.tagline}
                      </Text>
                      <Text fw={500} size="lg" color="white" lineClamp={7} className={classes.overview}>
                        {movieData.overview}
                      </Text>

                      {/* Crew Information
                  <Group mt="xl" gap="xl">
                    <div>
                      <Text size="lg" fw={700} color="white">
                        {movie.director}
                      </Text>
                      <Text size="lg" color="white">
                        Director
                      </Text>
                    </div>
                    <div>
                      <Text size="md" fw={700} color="white">
                        {movie.writer}
                      </Text>
                      <Text size="md" color="white">
                        Novel
                      </Text>
                    </div>
                    <div>
                      <Text size="md" fw={700} color="white">
                        {movie.screenplay}
                      </Text>
                      <Text size="md" color="white">
                        Screenplay
                      </Text>
                    </div>
                  </Group> */}
                  </div>
                  </div>
                <Group className={classes.buttons} justify="center" gap="2rem"> 
                  <Button
                    className={classes.button}
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'cyan', to: 'green', deg: 60 }}
                    onClick={() => window.open(`https://www.themoviedb.org/movie/${currentMovieId}`, '_blank')}
                  >
                    View on TMDB
                  </Button>
                  <Button
                    className={classes.button}
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
                    onClick={navigateToHome}
                  >
                    Back To Home
                  </Button>  
                </Group>
              </div>
            </div>
          </div>
          // {/* Decorative Images */}
          // {/* <Image src="/bg-1.png" className={classes.bottomLeftImage} />
          // <Image src="/bg-2.png" className={classes.bottomRightImage} /> */}
        )}
      </Paper>
    </>
  );
}
