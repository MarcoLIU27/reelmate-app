'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Modal, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications';
import classes from './Vote.module.css';
import moviePoolStorage from '@/utils/moviePoolStorage';
import shortlistStorage from '@/utils/shortlistStorage';
import { calculateDominantColor } from '@/components/Questions/Questions';
import moviePoolHistoryStorage from '@/utils/moviePoolHistoryStorage';

const cacheDataLocally = (key: string, data: any) => {
  const dataToStore = JSON.stringify(data);
  if (sessionStorage.getItem(key) !== dataToStore) {
    sessionStorage.setItem(key, dataToStore);
    console.log('Data cached');
  } else {
    console.log('Data already exists in cache');
  }
};

const getCachedData = (key: string) => {
  const cached = sessionStorage.getItem(key);
  console.log('get cached data');
  return cached ? JSON.parse(cached) : null;
};

export function Vote({ id }: { id: string }) {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState<String>('Loading');
  // const [partyData, setPartyData] = useState<any>(null);
  const [partyDataUpdated, setPartyDataUpdated] = useState(false);
  const [unvotedCount, setUnvotedCount] = useState(-1);
  const [shortlistedCount, setShortlistedCount] = useState(-1);
  const [currentMovieId, setCurrentMovieId] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [backdropUrl, setBackdropUrl] = useState<string>('');
  const [gradient, setGradient] = useState('');
  // const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

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

  const addToLikeLocal = async () => {
    // Remove from local pool
    moviePoolStorage.remove(currentMovieId!);
    setLoading(true);
    setLoadingText("Searching for recommendations...");
    // Get user preferences (From DB / local cache)
    const preferenceData = getCachedData("preferences");
    const poolHistory = moviePoolHistoryStorage.getAll();
    if (preferenceData == null) {
      // TODO: Get from DB
    }
    // Get recommended Id, add to movie pool
    try {
      const response = await fetch(`/api/recommend/${currentMovieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferenceData, poolHistory }),
      });
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      const recommendations = await response.json();
      console.log("recommend:", recommendations);
      if (recommendations.numResults === 0) {
        // Popup: Not found
        notifications.show({
          title: 'No Recommendations Found',
          message: "Ah-oh, we can't find any recommendations matching your preferences now.",
          autoClose: 3000, // Automatically close after 3 seconds
          color: 'pink',
          radius: 'lg',
          position: 'top-center',
        });
      } else {
        const recommendationIds = recommendations.recommendations.map((rec) => rec.id);
        // Add new recommendations to movie pool
        recommendationIds.forEach((id) => {
            moviePoolStorage.add(id.toString());
            moviePoolHistoryStorage.add(id.toString());
        });
      
        // Popup: Successful
        notifications.show({
          title: 'Recommendations Added',
          message: `Successfully added ${recommendationIds.length} recommendations to your movie pool!`,
          //autoClose: 3000, // Automatically close after 3 seconds
          color: 'pink',
          radius: 'lg',
          position: 'top-center',
        });
      }

    } catch (error) {
      console.error('Error get recommendations:', error);
    }

    setPartyDataUpdated(false);
  };

  const addToShortlistLocal = () => {
    // Remove from local pool, and add id to shortlist
    moviePoolStorage.remove(currentMovieId!);
    shortlistStorage.add(currentMovieId!);
    // console.log(moviePoolStorage.getAll());
    // console.log(shortlistStorage.getAll());
    setPartyDataUpdated(false);
  };

  const skipLocal = () => {
    // Remove from local pool
    moviePoolStorage.remove(currentMovieId!);
    setPartyDataUpdated(false);
  };

  const confirmNextStep = () => {
    close();
    // TODO: upload shortlist
    router.push(`/shortlist/${id}`);
  }

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
        try {
          dominantColor = await calculateDominantColor(proxiedPosterUrl);
          if (!dominantColor) {
            console.error('No dominant color extracted.');
          }
        } catch (error) {
          console.error('Error in dominant color processing:', error);
          throw error;
        }

        // Cache to session storage
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
          dominantColor: dominantColor,
        };
        cacheDataLocally(currentMovieId!, createMovieBody);
        setMovieData(createMovieBody);
      } else {
        setMovieData(cachedData);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // Trigger fetchPartyData at first loading or whenever partyDataUpdated changes from true to false
  useEffect(() => {
    if (!partyDataUpdated) {
      setLoading(true);
      setLoadingText('Presenting the next movie...');
      console.log('Fetching party data ...');
      // fetchPartyData();
      // Get from Session Storage:
      // TODO: If user open current link in a new session, movie pool storage will be cleared. Need to fetch full MoviePool from DB and store.
      if (moviePoolStorage.getAll() === null) {
        moviePoolStorage.initialize();
        moviePoolHistoryStorage.initialize();
        shortlistStorage.initialize();
        // TODO: fetch full MoviePool from DB and store.
      }
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
    if (unvotedCount === 0 || shortlistedCount === 10) {
      // TODO: Upload local shortlist to DB
      router.push(`/shortlist/${id}`);
    }
  }, [unvotedCount, shortlistedCount]);

  // Set the gradient dynamically when the dominant color is extracted
  useEffect(() => {
    if (movieData) {
      console.log("data:", movieData);
      // Extract the RGB values from the dominant color
      const [r, g, b] = movieData.dominantColor;

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
            <>
              <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                size="xl"
                centered
                overlayProps={{
                  backgroundOpacity: 0.55,
                  blur: 3,
                }}
                styles={{
                  content: { borderRadius: '5rem' },
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '275px' }}>
                  <Text size="xl">
                    Are you sure to proceed to the next step?
                  </Text>
                  <Group gap="5rem" mt="md">
                    <Button size="lg" radius="xl" variant="default"  onClick={close}>Cancel</Button>
                    <Button size="lg" radius="xl"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'yellow', deg: 60 }} onClick={confirmNextStep}>Confirm</Button>
                  </Group>
                </div>
              </Modal>
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
                      <div>
                        <Image
                          src={posterUrl}
                          alt={movieData.title}
                          radius="lg"
                          className={classes.poster} />
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
                      <Button
                        className={classes.button}
                        size="lg"
                        radius="xl"
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'violet', deg: 60 }}
                        onClick={open}
                        disabled={shortlistStorage.getLength() === 0}
                      >
                        End Voting
                      </Button>
                    </Group>
                  </div>
                </div>
              </div>
            </>
          // {/* Decorative Images */}
          // {/* <Image src="/bg-1.png" className={classes.bottomLeftImage} />
          // <Image src="/bg-2.png" className={classes.bottomRightImage} /> */}
        )}
      </Paper>
    </>
  );
}
