'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Paper, Text, Title, Popover } from '@mantine/core';
import classes from './VoteCard.module.css';

export function VoteCard({ movieId, onVote }: {movieId: string, onVote: any}) {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<any>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [backdropUrl, setBackdropUrl] = useState<string>('');
  const [gradient, setGradient] = useState('');

  const getCachedData = (key: string) => {
    const cached = sessionStorage.getItem(key);
    console.log('get cached data');
    return cached ? JSON.parse(cached) : null;
  };

  // const movieData = {
  //   title: 'This is a very long Movie Name',
  //   year: 2003,
  //   rating: 'PG-13',
  //   releaseDate: '12/25/2003',
  //   genres: ['Adventure', 'Fantasy', 'Drama'],
  //   countries: ['US'],
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
  //   voteAverage: 10,
  // };

  // const backdropUrl = `${BASE_IMAGE_URL}/w1280${movieData.backdropPath}`;
  // const posterUrl = `${BASE_IMAGE_URL}/w780${movieData.posterPath}`;


  useEffect(() => {
    setLoading(true);
    if (movieId) {
      console.log(movieId)
      const cachedData = getCachedData(movieId!);
      setMovieData(cachedData);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieData) {
      console.log(movieData);
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
        style={{
          borderRadius: 'inherit',
          height: '100%',
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
          </div>
        ) : (
          <div
            className={classes.outterContainer}
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className={classes.glassEffect}>
              <div className={classes.innerContainer} style={{ backgroundImage: gradient }}>
                <div className={classes.content}>
                  {/* Left Section - Poster */}
                  <div className={classes.poster}>
                    <Image
                      src={posterUrl}
                      alt={movieData.title}
                      radius="lg"
                    />
                  </div>
                  {/* Right Section - Info */}
                  <div className={classes.details}>
                    {/* Title and Metadata */}
                    <Title order={1} className={classes.title} style={{ color: 'white' }}>
                      {movieData.title}
                    </Title>
                    <Text fz="1rem" color="white" mt="xs">
                      {movieData.countries.join(', ')} • {movieData.genres.join(', ')} •{' '}
                      {movieData.runtime} min
                    </Text>

                    {/* User Score */}
                    <Badge
                      size="lg"
                      color="green"
                      radius="xl"
                      mt="md"
                      style={{ fontSize: '1rem', fontWeight: 'bold' }}
                    >
                      {movieData.voteAverage * 10}%
                    </Badge>

                    {/* Overview */}
                    <Text fw={700} size="xl" mt="lg" color="white">
                      {movieData.tagline}
                    </Text>
                    <Text fw={500} size="lg" mt="lg" color="white">
                        {movieData.overview}
                      </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <Popover position="top" shadow="md">
                    <Popover.Target>
                      <Button className={classes.moreButton}
                        radius="xl"
                        variant="light"
                        color="pink">
                        More Info
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
                    </Popover.Dropdown>
                  </Popover>
                  <Button
                    className={classes.button}
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
                    onClick={onVote}
                  >
                    Choose This
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </>
  );
}
