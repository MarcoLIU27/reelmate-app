'use client';

import { useRouter } from 'next/navigation';
import { IconCircleCheck } from '@tabler/icons-react';
import { Button, Grid, Image, List, Paper, rem, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './ResultNotFound.module.css';

export function ResultNotFound() {
  const router = useRouter();
  
  const navigateToHome = () => {
    router.push('/start');
  };

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
        <Title ta="center" order={1} pt="15vh">
          Sorry! We can't find any movie for you!
        </Title>
        <Text ta="center" fw={500} size="xl" pt="5vh">
          Please modify your preferences and search again.
        </Text>

        <Button
          className={classes.button}
          size="xl"
          radius="lg"
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
          onClick={navigateToQuestions}
        >
          Back to Home Page
        </Button>
        {/* Decorative Images */}
        <Image src="/bg-1.png" className={classes.bottomLeftImage} />
        <Image src="/bg-2.png" className={classes.bottomRightImage} />
      </Paper>
    </>
  );
}
