'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Paper, Text, Title } from '@mantine/core';
import classes from './Vote.module.css';
import moviePoolStorage from '@/utils/moviePoolStorage';
import shortlistStorage from '@/utils/shortlistStorage';

export function Vote({ id }: { id: string }) {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState<String>('Loading');
  const [partyData, setPartyData] = useState<any>(null);
  const [partyDataUpdated, setPartyDataUpdated] = useState(false);
  const [unvotedCount, setUnvotedCount] = useState(-1);
  const [shortlistedCount, setShortlistedCount] = useState(-1);
  const [currentMovieId, setCurrentMovieId] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [backdropUrl, setBackdropUrl] = useState<string>('');
  const [gradient, setGradient] = useState('');
  const router = useRouter();

  const getCachedData = (key: string) => {
    const cached = sessionStorage.getItem(key);
    console.log('get cached data');
    return cached ? JSON.parse(cached) : null;
  };

  const addToLike = async () => {
    setPartyDataUpdated(false);
    // change unvoted to skip
    try {
      const modifyPoolStatusBody = JSON.stringify({
        movieId: currentMovieId,
        status: 'liked',
      });
      const response = await fetch(`/api/party/${id}`, {
        method: 'PUT',
        body: modifyPoolStatusBody,
      });
      if (!response.ok) {
        throw new Error('Failed to modify party data');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error modify party data:', error);
    }
  };

  const addToShortlist = async () => {
    setPartyDataUpdated(false);
    // change unvoted to shortlisted, and add id to shortlist
    try {
      const modifyPoolStatusBody = JSON.stringify({
        movieId: currentMovieId,
        status: 'shortlisted',
      });
      const response = await fetch(`/api/party/${id}`, {
        method: 'PUT',
        body: modifyPoolStatusBody,
      });
      if (!response.ok) {
        throw new Error('Failed to modify party data');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error modify party data:', error);
    }
  };

  const skip = async () => {
    setPartyDataUpdated(false);
    // change unvoted to skip
    try {
      const modifyPoolStatusBody = JSON.stringify({
        movieId: currentMovieId,
        status: 'skipped',
      });
      const response = await fetch(`/api/party/${id}`, {
        method: 'PUT',
        body: modifyPoolStatusBody,
      });
      if (!response.ok) {
        throw new Error('Failed to modify party data');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error modify party data:', error);
    }
  };

  const addToLikeLocal = () => {
    // Remove from local pool, add recommended id to pool
    moviePoolStorage.remove(currentMovieId!);
    setPartyDataUpdated(false);
  };

  const addToShortlistLocal = () => {
    // Remove from local pool, and add id to shortlist
    moviePoolStorage.remove(currentMovieId!);
    shortlistStorage.add(currentMovieId!);
    console.log(moviePoolStorage.getAll());
    console.log(shortlistStorage.getAll());
    setPartyDataUpdated(false);
  };

  const skipLocal = () => {
    // Remove from local pool
    moviePoolStorage.remove(currentMovieId!);
    setPartyDataUpdated(false);
  };

  // Fetch Party Data Function
  const fetchPartyData = async () => {
    try {
      const response = await fetch(`/api/party/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch party data');
      }
      const data = await response.json();
      setPartyData(data);
    } catch (error) {
      console.error('Error fetching party data:', error);
    }
  };

  const fetchMovieData = async () => {
    try {
      console.log(currentMovieId);
      // Try to get local cache first
      const cachedData = getCachedData(currentMovieId!);
      if (cachedData == null) {
        const response = await fetch(`/api/movie/tmdb/${currentMovieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovieData(data);
      } else {
        setMovieData(cachedData);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // Trigger fetchPartyData at first loading or whenever partyDataUpdated changes from true to false
  useEffect(() => {
    console.log("here")
    if (!partyDataUpdated) {
      setLoading(true);
      setLoadingText('Presenting the next movie...');
      console.log('Fetching party data ...');
      // fetchPartyData();
      // Get from Session Storage:
      console.log(moviePoolStorage.getAll());
      console.log(shortlistStorage.getAll());
      setUnvotedCount(moviePoolStorage.getLength());
      setShortlistedCount(shortlistStorage.getLength());
      setCurrentMovieId(moviePoolStorage.getFirst());
      setPartyDataUpdated(true);
    }
  }, [partyDataUpdated]);

  // useEffect(() => {
  //   if (partyData) {
  //     setUnvotedCount(partyData.totalUnvoted);
  //     setShortlistedCount(partyData.totalShortlisted);
  //     setCurrentMovieId(partyData.firstUnvotedMovieId);
  //     setPartyDataUpdated(true);
  //   }
  // }, [partyData]);

  useEffect(() => {
    if (currentMovieId) {
      fetchMovieData();
    }
  }, [currentMovieId]);

  useEffect(() => {
    if (unvotedCount === 0) {
      router.push(`/shortlist/${id}`);
    }
  }, [unvotedCount]);

  // useEffect(() => {
  //   if (movieData) {
  //     console.log(movieData)
  //     const movie = {
  //       title: movieData.title,
  //       originalTitle: movieData.
  //       year: 2003,
  //       rating: 'PG-13',
  //       releaseDate: '12/25/2003',
  //       genres: ['Adventure', 'Fantasy', 'Drama'],
  //       runtime: '2h 5m',
  //       userScore: 78,
  //       tagline: 'An adventure as big as life itself!',
  //       overview:
  //         'Throughout his life Edward Bloom has always been a man of big appetites, enormous passions and tall tales. In his later years, he remains a huge mystery to his son, William. Now, to get to know the real man, Will begins piecing together a true picture of his father from flashbacks of his amazing adventures.',
  //       director: 'Tim Burton',
  //       writer: 'Daniel Wallace',
  //       screenplay: 'John August',
  //       streamingPlatform: 'Pluto TV',
  //       postePath: '/tjK063yCgaBAluVU72rZ6PKPH2l.jpg',
  //       backdropPath: '/bLqUd0tBvKezDr9MEla7k34i3rp.jpg',
  //       dominantColor: [188, 201, 214],
  //     };
  //   }
  // }, [movieData]);

  // const movie = {
  //   title: 'Big Fish',
  //   year: 2003,
  //   rating: 'PG-13',
  //   releaseDate: '12/25/2003',
  //   genres: ['Adventure', 'Fantasy', 'Drama'],
  //   runtime: '2h 5m',
  //   userScore: 78,
  //   tagline: 'An adventure as big as life itself!',
  //   overview:
  //     'Throughout his life Edward Bloom has always been a man of big appetites, enormous passions and tall tales. In his later years, he remains a huge mystery to his son, William. Now, to get to know the real man, Will begins piecing together a true picture of his father from flashbacks of his amazing adventures.',
  //   director: 'Tim Burton',
  //   writer: 'Daniel Wallace',
  //   screenplay: 'John August',
  //   streamingPlatform: 'Pluto TV',
  //   posterPath: '/tjK063yCgaBAluVU72rZ6PKPH2l.jpg',
  //   backdropPath: '/bLqUd0tBvKezDr9MEla7k34i3rp.jpg',
  //   dominantColor: [188, 201, 214],
  // };

  // const backdropUrl = `${BASE_IMAGE_URL}/w1280${movie.backdropPath}`;
  // const posterUrl = `${BASE_IMAGE_URL}/w780${movie.posterPath}`;

  // Set the gradient dynamically when the dominant color is extracted
  useEffect(() => {
    if (movieData) {
      console.log("data:", movieData);
      // Extract the RGB values from the dominant color
      const [r, g, b] = movieData.dominantColor;

      // Create a vertical gradient
      // const gradient = `linear-gradient(
      //   to bottom,
      //   rgba(${r}, ${g}, ${b}, 1) 0%,
      //   rgba(${r}, ${g}, ${b}, 0.84) 35%,
      //   rgba(${r}, ${g}, ${b}, 0.7) 55%,
      //   rgba(255, 255, 255, 0.7) 65%,
      //   rgba(255, 255, 255, 1) 90%
      // )`;

      const gradient = `linear-gradient(
        to bottom,
        rgba(${r}, ${g}, ${b}, 1) 0%,
        rgba(${r}, ${g}, ${b}, 0.5) 55%,
        rgba(255, 255, 255, 1) 95%
      )`;
      //console.log(gradient);
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
                <div className={classes.progress}>
                  <Badge
                    size="lg"
                    color="cyan"
                    radius="xl"
                    style={{ fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    Pool left
                  </Badge>
                    <Title size="h2" c="white">{' '}{unvotedCount}{' '}</Title>
                  <Badge
                    size="lg"
                    color="teal"
                    radius="xl"
                    style={{ fontSize: '1rem', fontWeight: 'bold', marginLeft: '2rem' }}
                  >
                    Shortlist
                    </Badge>
                    <Title size="h2" c="white">{' '}{shortlistedCount}/10 </Title>
                </div>
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
                      <Text fw={500} size="lg" color="white" className={classes.overview}>
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
                    gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
                    onClick={addToLikeLocal}
                  >
                    Watched & Like
                  </Button>
                  <Button
                    className={classes.button}
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'cyan', to: 'green', deg: 60 }}
                    onClick={addToShortlistLocal}
                  >
                    Add to Shortlist
                  </Button>
                  <Button
                    className={classes.button}
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'grey', to: 'dimmed', deg: 60 }}
                    onClick={skipLocal}
                  >
                    Skip
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
