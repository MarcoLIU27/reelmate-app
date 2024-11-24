'use client';

import { useState } from 'react';
import { Button, Group, Paper, Stepper, Text, Title, RangeSlider, SegmentedControl } from '@mantine/core';
import classes from './Questions.module.css';
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

const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'jp', label: 'Japanese' },
  { value: 'sp', label: 'Spanish' },
  { value: 'kr', label: 'Korean' },
  { value: 'fr', label: 'French' },
];

const presets = {
  latest: [2022, 2024],
  recent: [2019, 2024],
  modern: [2000, 2024],
  classic: [1920, 1999],
}

function Questions() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDislikedGenres, setSelectedDislikedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1920, 2024]);
  const [voteSelection, setVoteSelection] = useState(true);

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
          <Stepper.Step label="Years">
            <YearsSelector
              yearRange={yearRange}
              setYearRange={setYearRange}
            />
          </Stepper.Step>
          <Stepper.Step label="Vote">
            <VoteSelector
                voteSelection={voteSelection}
                setVoteSelection={setVoteSelection}
            />
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

      <Group className={classes.choices} style={{paddingTop: '10vh'}}>
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

const YearsSelector = ({ yearRange, setYearRange }: any): any => {

  const applyPreset = (preset: keyof typeof presets) => {
    setYearRange(presets[preset]);
  };

  return (
    <div className={classes.content} style={{ maxWidth: '600px'}}>
      <Title order={2} ta="center" mb="md">
        Select your preferred release year range
      </Title>
      <Text ta="center" mb="sm" color="dimmed">
        Use the slider or choose a quick preset.
      </Text>

      {/* Dual-Range Slider */}
      <RangeSlider
        color="pink"
        size="xl"
        value={yearRange}
        onChange={setYearRange}
        min={1920}
        max={2024}
        step={1}
        marks={[
          { value: 1920, label: '1920' },
          { value: 1950, label: '1950' },
          { value: 1980, label: '1980' },
          { value: 2000, label: '2000' },
          { value: 2024, label: '2024' },
        ]}
        mt="lg"
        mb="lg"
        styles={{
          markLabel: { fontSize: '1rem' },
          mark: { display: 'block' },
        }}
      />
      {/* Display selected range */}
      <Text ta="center" pt="lg" color="pink">
        Selected Range: {yearRange[0]} - {yearRange[1]}
      </Text>

      {/* Presets */}
      <Group pt="lg" style={{ justifyContent: 'center' }}>
        <Button
          color="pink"
          variant="outline"
          size="md"
          radius="xl"
          onClick={() => applyPreset('latest')}
        >
          Latest (Past 2 years)
        </Button>
        <Button
          color="pink"
          variant="outline"
          size="md"
          radius="xl"
          onClick={() => applyPreset('recent')}
        >
          Recent (Past 5 years)
        </Button>
        <Button
        color="pink"
          variant="outline"
          size="md"
          radius="xl"
          onClick={() => applyPreset('modern')}
        >
          Modern (2000-present)
        </Button>
        <Button
          color="pink"
          variant="outline"
          size="md"
          radius="xl"
          onClick={() => applyPreset('classic')}
        >
          Classic (Pre-2000)
        </Button>
      </Group>
    </div>
  );
}

const VoteSelector = ({ voteSelection, setVoteSelection }: any): any => {
  return (
    <div className={classes.content} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <Title order={2} ta="center" mb="md">
        Select movies with average vote ≥ 7.0 only?
      </Title>
      <SegmentedControl
        style={{ marginTop: '10vh' }}
        size="lg"
        radius="xl"
        value={voteSelection}
        onChange={setVoteSelection}
        data={[
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
      />
    </div>
  );
}

export default Questions;
