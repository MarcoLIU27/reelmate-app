'use client';

import { useState } from 'react';
import { Button, Group, Paper, Stepper, Text, Title } from '@mantine/core';
import classes from './Questions.module.css';
const genres = [
  { value: 'action', label: 'Action 🥊', id: '28' },
  { value: 'adventure', label: 'Adventure 🗺️', id: '12' },
  { value: 'animation', label: 'Animation 🎨', id: '16' },
  { value: 'comedy', label: 'Comedy 😂', id: '35' },
  { value: 'crime', label: 'Crime 🕵️', id: '80'  },
  { value: 'documentary', label: 'Documentary 📽️', id: '99'  },
  { value: 'drama', label: 'Drama 🎭', id: '18'  },
  { value: 'family', label: 'Family 👨‍👩‍👧‍👦', id: '10751'},
  { value: 'fantasy', label: 'Fantasy ✨', id: '14' },
  { value: 'history', label: 'History 📜', id: '36' },
  { value: 'horror', label: 'Horror 👻', id: '27' },
  { value: 'music', label: 'Music 🎵', id: '10402' },
  { value: 'mystery', label: 'Mystery 🔍', id: '9648' },
  { value: 'romance', label: 'Romance 💑', id: '10749' },
  { value: 'science-fiction', label: 'Science Fiction 🚀', id: '878' },
  { value: 'tv-movie', label: 'TV Movie 📺', id: '10770' },
  { value: 'thriller', label: 'Thriller 😱', id: '53' },
  { value: 'war', label: 'War ⚔️', id: '10752' },
  { value: 'western', label: 'Western 🤠', id: '37' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'jp', label: 'Janpanese' },
];

function Questions() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const default_recommend_params = {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  }

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDislikedGenres, setSelectedDislikedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const recommend = async () => {
    const selectedGenresIds = selectedGenres.map(
      value => {
        const genre = genres.find(genre => genre.value === value);
        return genre? genre.id : '0';
      }
    ).join();
    const selectedDislikedGenresIds = selectedDislikedGenres.map(
      value => {
        const genre = genres.find(genre => genre.value === value);
        return genre? genre.id : '0';
      }
    ).join();
    const params = {
      ...default_recommend_params,
      with_genres: selectedGenresIds,
      without_genres: selectedDislikedGenresIds,
    }
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/discover?${queryString}`);
    const result = await response.json();
  }

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
        <Stepper color="pink" active={active} onStepClick={setActive} allowNextStepsSelect={false} mt="5vh" style={{ width: '80%'}}>
          <Stepper.Step label="Genres" description="Likes">
            <GenresSelector
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </Stepper.Step>
          <Stepper.Step label="Genres" description="Dislikes">
            <DislikedGenresSelector
              selectedDislikedGenres={selectedDislikedGenres}
              setSelectedDislikedGenres={setSelectedDislikedGenres}
              selectedGenres={selectedGenres}
            />
          </Stepper.Step>
          <Stepper.Step label="Language">
            <LanguagesSelector
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
            />
          </Stepper.Step>
          <Stepper.Step label="Language">
            Question 4 content: Get full access
          </Stepper.Step>
          <Stepper.Step label="Language">
            Question 5 content: Get full access
          </Stepper.Step>
          <Stepper.Step label="Language">
            Question 6 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl" gap="2rem">
          <Button
            className={classes.button}
            size="lg"
            radius="xl"
            variant="outline"
            color="pink"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            size="lg"
            radius="xl"
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
            onClick={nextStep}>
            Next
          </Button>
        </Group>
      </Paper>
    </>
  );
}

const GenresSelector = ({ selectedGenres, setSelectedGenres }: any): any => {
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
    <div className={classes.content}>
      <Title order={2} ta="center" mb="md">
        Select your preferred genres
      </Title>
      <Text ta="center" mb="sm" color="dimmed">
        Pick up to 3 genres that you enjoy the most.
      </Text>

      <Group className={classes.choices}>
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

const DislikedGenresSelector = ({ selectedDislikedGenres, setSelectedDislikedGenres, selectedGenres }: any): any => {
  const toggleGenre = (value: string) => {
    if (selectedDislikedGenres.includes(value)) {
      // Remove if already selected
      setSelectedDislikedGenres(selectedDislikedGenres.filter((genre: any) => genre !== value));
    } else {
      setSelectedDislikedGenres([...selectedDislikedGenres, value]);
    }
  };

  return (
    <div className={classes.content}>
      <Title order={2} ta="center" mb="md">
        Select your disliked genres
      </Title>
      <Text ta="center" mb="sm" color="dimmed">
        Select all genres that you want to avoid.
      </Text>

      <Group className={classes.choices}>
        {genres.map((genre) => (
          <Button
            key={genre.value}
            variant={ selectedDislikedGenres.includes(genre.value) ? 'filled' : 'outline'}
            color={selectedDislikedGenres.includes(genre.value) ? 'pink' : 'gray'}
            disabled={selectedGenres.includes(genre.value)}
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

const LanguagesSelector = ({ selectedLanguages, setSelectedLanguages }: any): any => {
  const toggleGenre = (value: string) => {
    if (selectedLanguages.includes(value)) {
      // Remove if already selected
      setSelectedLanguages(selectedLanguages.filter((genre: any) => genre !== value));
    } else {
      setSelectedLanguages([...selectedLanguages, value]);
    }
  };

  return (
    <div className={classes.content}>
      <Title order={2} ta="center" mb="md">
        Select your prefered languages
      </Title>
      <Text ta="center" mb="sm" color="dimmed">
        Pick languages of the movie you like.
      </Text>

      <Group className={classes.choices}>
        {languages.map((language) => (
          <Button
            key={language.value}
            variant={ selectedLanguages.includes(language.value) ? 'filled' : 'outline'}
            color={selectedLanguages.includes(language.value) ? 'pink' : 'gray'}
            onClick={() => toggleGenre(language.value)}
            radius="xl"
            size="md"
          >
            {language.label}
          </Button>
        ))}
      </Group>
    </div>
  );
};

export default Questions;
