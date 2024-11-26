'use client';
import { useEffect, useState } from 'react';
import {  } from '@tabler/icons-react';
import { Badge, Button, Group, Image, Paper, Text, Title } from '@mantine/core';
import { useColor } from 'color-thief-react'
import classes from './Vote.module.css';

export function Vote({ id }: { id: string }) {

  const [gradient, setGradient] = useState('');

  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

  const movie = {
    title: 'Big Fish',
    year: 2003,
    rating: 'PG-13',
    releaseDate: '12/25/2003',
    genres: ['Adventure', 'Fantasy', 'Drama'],
    runtime: '2h 5m',
    userScore: 78,
    tagline: 'An adventure as big as life itself!',
    overview:
      'Throughout his life Edward Bloom has always been a man of big appetites, enormous passions and tall tales. In his later years, he remains a huge mystery to his son, William. Now, to get to know the real man, Will begins piecing together a true picture of his father from flashbacks of his amazing adventures.',
    director: 'Tim Burton',
    writer: 'Daniel Wallace',
    screenplay: 'John August',
    streamingPlatform: 'Pluto TV',
    poster_path: '/tjK063yCgaBAluVU72rZ6PKPH2l.jpg',
    backdrop_path: '/bLqUd0tBvKezDr9MEla7k34i3rp.jpg',
  };

  const backdropUrl = `${BASE_IMAGE_URL}/w1280${movie.backdrop_path}`;
  const posterUrl = `${BASE_IMAGE_URL}/w780${movie.poster_path}`;
  const proxiedBackdropUrl = `/api/proxy?url=${encodeURIComponent(posterUrl)}`;

  // Generate Gradient Overlay for Backdrop
  const { data: dominantColor, loading, error } = useColor(proxiedBackdropUrl, 'rgbArray', {
    crossOrigin: 'anonymous',
  });
  console.log(dominantColor)

  // Set the gradient dynamically when the dominant color is extracted
  useEffect(() => {
    if (dominantColor) {
      // Extract the RGB values from the dominant color
      const [r, g, b] = dominantColor;

      // Create a vertical gradient
      const gradient = `linear-gradient(
        to bottom,
        rgba(${r}, ${g}, ${b}, 1) 0%,
        rgba(${r}, ${g}, ${b}, 0.84) 35%,
        rgba(${r}, ${g}, ${b}, 0.7) 55%,
        rgba(255, 255, 255, 0.7) 65%,
        rgba(255, 255, 255, 1) 90%
      )`;
      console.log(gradient);
      setGradient(gradient);
    }
  }, [dominantColor]);

  if (loading)
      console.log('Loading image colors');
  if (error)
      console.log(error);

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
        {/* <h1>Vote Page</h1>
        <p>Current Party ID: {id}</p> */}

        <div className={classes.outterContainer} style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className={classes.innerContainer} style={{ backgroundImage: gradient }}>
            <div className={classes.content}>
            {/* Left Section - Poster */}
            <div>
              <Image
                src={posterUrl}
                alt={movie.title}
                radius="lg"
                style={{ width: '300px' }}
              />
            </div>
            <div style={{ paddingLeft: '2rem'}}>
              {/* Right Section - Details */}
              <div style={{ flex: 1 }}>
                {/* Title and Metadata */}
                <Title order={1}>
                  {movie.title}{' '}
                  <Text component="span" size="xl" color="dimmed">
                    ({movie.year})
                  </Text>
                </Title>
                <Text size="sm" color="dimmed" mt="xs">
                  {movie.rating} • {movie.releaseDate} • {movie.genres.join(', ')} • {movie.runtime}
                </Text>

                {/* User Score */}
                <Group mt="md" gap="sm">
                  <Badge
                    size="lg"
                    color="green"
                    radius="xl"
                    style={{ fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    {movie.userScore}%
                  </Badge>
                  <Text size="sm" fw={500}>
                    User Score
                  </Text>
                </Group>

                {/* Overview */}
                <Text fw={700} size="lg" mt="xl">
                  {movie.tagline}
                </Text>
                <Text mt="sm">{movie.overview}</Text>

                {/* Crew Information */}
                <Group mt="xl" gap="xl">
                  <div>
                    <Text size="sm" fw={700}>
                      {movie.director}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Director
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" fw={700}>
                      {movie.writer}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Novel
                    </Text>
                  </div>
                  <div>
                    <Text size="sm" fw={700}>
                      {movie.screenplay}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Screenplay
                    </Text>
                  </div>
                </Group>
              </div>
            </div>
            </div>
          </div>
        </div>
        {/* Decorative Images */}
        {/* <Image src="/bg-1.png" className={classes.bottomLeftImage} />
        <Image src="/bg-2.png" className={classes.bottomRightImage} /> */}
      </Paper>
    </>
  );
}
