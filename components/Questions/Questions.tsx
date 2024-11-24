'use client';

import { useState } from 'react';
import { Button, Group, MultiSelect, Paper, Stepper, Text, Title } from '@mantine/core';

const genres = [
  { value: 'action', label: 'Action 🥊' },
  { value: 'adventure', label: 'Adventure 🗺️' },
  { value: 'animation', label: 'Animation 🎨' },
  { value: 'comedy', label: 'Comedy 😂' },
  { value: 'crime', label: 'Crime 🕵️' },
  { value: 'documentary', label: 'Documentary 📽️' },
  { value: 'drama', label: 'Drama 🎭' },
  { value: 'family', label: 'Family 👨‍👩‍👧‍👦' },
  { value: 'fantasy', label: 'Fantasy ✨' },
  { value: 'history', label: 'History 📜' },
  { value: 'horror', label: 'Horror 👻' },
  { value: 'music', label: 'Music 🎵' },
  { value: 'mystery', label: 'Mystery 🔍' },
  { value: 'romance', label: 'Romance 💑' },
  { value: 'science-fiction', label: 'Science Fiction 🚀' },
  { value: 'tv-movie', label: 'TV Movie 📺' },
  { value: 'thriller', label: 'Thriller 😱' },
  { value: 'war', label: 'War ⚔️' },
  { value: 'western', label: 'Western 🤠' },
];

function Questions() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDislikedGenres, setSelectedDislikedGenres] = useState<string[]>([]);

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
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} mt="5vh">
          <Stepper.Step label="Genres" description="Likes">
            <GenreButtonSelector
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </Stepper.Step>
          <Stepper.Step label="Genres" description="Dislikes">
            Question 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step label="Language">Question 3 content: Get full access</Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </Paper>
    </>
  );
}

const GenreButtonSelector = ({ selectedGenres, setSelectedGenres }: any): any => {
  const toggleGenre = (value: string) => {
    if (selectedGenres.includes(value)) {
      // Remove if already selected
      setSelectedGenres(selectedGenres.filter((genre: any) => genre !== value));
    } else if (selectedGenres.length < 3) {
      // Add if less than 3 selected
      setSelectedGenres([...selectedGenres, value]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 0' }}>
      <Title order={2} ta="center" mb="md">
        Select your preferred genres
      </Title>
      <Text ta="center" mb="sm" color="dimmed">
        Pick up to 3 genres that you enjoy the most.
      </Text>

      <Group gap="md" ta="center" wrap="wrap">
        {genres.map((genre) => (
          <Button
            key={genre.value}
            variant={selectedGenres.includes(genre.value) ? 'filled' : 'outline'}
            color={selectedGenres.includes(genre.value) ? 'pink' : 'gray'}
            onClick={() => toggleGenre(genre.value)}
            radius="xl"
            size="md"
          >
            {genre.label}
          </Button>
        ))}
      </Group>
    </div>
  );
};

export default Questions;
