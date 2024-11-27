'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Paper, Text, Title } from '@mantine/core';
import classes from './Comparison.module.css';
import { VoteCard } from '@/components/VoteCard/VoteCard';

export function Comparison({ id }: { id: string }) {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p';

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<String>('Loading');
  const [partyData, setPartyData] = useState<any>(null);
  const [partyDataUpdated, setPartyDataUpdated] = useState(false);
  const [unvotedCount, setUnvotedCount] = useState(-1);
  const [shortlistedCount, setShortlistedCount] = useState(-1);
  const [currentMovieId, setCurrentMovieId] = useState<string | null>(null);
  // const [movieData, setMovieData] = useState<any>(null);
  // const [posterUrl, setPosterUrl] = useState<string>('');
  // const [backdropUrl, setBackdropUrl] = useState<string>('');
  const [gradient, setGradient] = useState('');
  const router = useRouter();

  const getCachedData = (key: string) => {
    const cached = sessionStorage.getItem(key);
    console.log('get cached data');
    return cached ? JSON.parse(cached) : null;
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

  // Fetch Party Data Function
  const fetchPartyData = async () => {
    try {
      const response = await fetch(`/api/party/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch party data');
      }
      const data = await response.json();
      //console.log(data);
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
        //setMovieData(data);
      } else {
        //setMovieData(cachedData);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // // Trigger fetchPartyData at first or whenever partyDataUpdated changes from true to false
  // useEffect(() => {
  //   if (!partyDataUpdated) {
  //     setLoading(true);
  //     setLoadingText("Presenting the next movie...");
  //     console.log("fetch party data");
  //     fetchPartyData();
  //   }
  // }, [partyDataUpdated]);

  // useEffect(() => {
  //   if (partyData) { // Only run when partyData is not null
  //     //console.log(partyData);
  //     setUnvotedCount(partyData.totalUnvoted);
  //     setShortlistedCount(partyData.totalShortlisted);
  //     setCurrentMovieId(partyData.firstUnvotedMovieId);
  //     setPartyDataUpdated(true);
  //   }
  // }, [partyData]);

  // useEffect(() => {
  //   if (currentMovieId) {
  //     fetchMovieData();
  //   }
  // }, [currentMovieId]);

  // useEffect(() => {
  //   if (unvotedCount === 0) {
  //     router.push(`/shortlist/${id}`);
  //   }
  // }, [unvotedCount]);

  // // Set the gradient dynamically when the dominant color is extracted
  // useEffect(() => {
  //   if (movieData) {
  //     console.log(movieData)
  //     // Extract the RGB values from the dominant color
  //     const [r, g, b] = movieData.dominantColor;

  //     // Create a vertical gradient
  //     // const gradient = `linear-gradient(
  //     //   to bottom,
  //     //   rgba(${r}, ${g}, ${b}, 1) 0%,
  //     //   rgba(${r}, ${g}, ${b}, 0.84) 35%,
  //     //   rgba(${r}, ${g}, ${b}, 0.7) 55%,
  //     //   rgba(255, 255, 255, 0.7) 65%,
  //     //   rgba(255, 255, 255, 1) 90%
  //     // )`;

  //     const gradient = `linear-gradient(
  //       to bottom,
  //       rgba(${r}, ${g}, ${b}, 1) 0%,
  //       rgba(${r}, ${g}, ${b}, 0.5) 55%,
  //       rgba(255, 255, 255, 1) 95%
  //     )`;
  //     //console.log(gradient);
  //     setGradient(gradient);
  //     setPosterUrl(`${BASE_IMAGE_URL}/w780${movieData.posterPath}`);
  //     setBackdropUrl(`${BASE_IMAGE_URL}/w1280${movieData.backdropPath}`);
  //     setLoading(false);
  //   }
  // }, [movieData]);

  const movieData = {
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
    posterPath: '/tjK063yCgaBAluVU72rZ6PKPH2l.jpg',
    backdropPath: '/bLqUd0tBvKezDr9MEla7k34i3rp.jpg',
    dominantColor: [188, 201, 214],
  };

  const backdropUrl = `${BASE_IMAGE_URL}/w1280${movieData.backdropPath}`;
  const posterUrl = `${BASE_IMAGE_URL}/w780${movieData.posterPath}`;

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
            <div className={classes.content}>
              {/* Top Card */}
                <div className={classes.leftCard} style={{borderRight: 'solid', borderColor: 'white'}}>
                  <VoteCard 
                />
              </div>
              {/* Bottom Card */}
              <div className={classes.rightCard}>
                <VoteCard
                />
              </div>
            </div>
          </>
        )}
      </Paper>
    </>
  );
}
