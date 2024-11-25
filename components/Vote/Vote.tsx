'use client';

import { IconCircleCheck } from '@tabler/icons-react';
import { Button, Grid, Image, List, Paper, rem, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Vote.module.css';

export function Vote({ id }: { id: string }) {

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
        <h1>Vote Page</h1>
        <p>Current Party ID: {id}</p>
        {/* Decorative Images */}
        <Image src="/bg-1.png" className={classes.bottomLeftImage} />
        <Image src="/bg-2.png" className={classes.bottomRightImage} />
      </Paper>
    </>
  );
}
