'use client';

import { IconCircleCheck } from '@tabler/icons-react';
import { Button, Grid, Image, List, Paper, rem, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Home.module.css';

export function Home() {
  return (
    <>
      <Paper
        radius="xl"
        style={{
          height: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'center', paddingTop: '6rem' }}>
          <Text
            className={classes.title}
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            ReelMates
          </Text>
          <Text className={classes.subtitle} component="span">
            {' '}
            - Your Party Movie Picker
          </Text>
        </div>
        <Title ta="center" order={1} pt="2rem">
          Pick your party movie in a brand new way!
        </Title>
        <List
          spacing="xs"
          center
          icon={
            <ThemeIcon color="pink" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
          c="dimmed"
          lh={4}
          w={500}
          mx="auto"
          pt="4rem"
        >
          <List.Item>
            <Grid w={500} align="center">
              <Grid.Col span={3}>
                <Text fz={24} fw={700} ta="center">
                  Step 1:
                </Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Text fz={26}>Create a party 🥳</Text>
              </Grid.Col>
            </Grid>
          </List.Item>

          <List.Item>
            <Grid w={500} align="center">
              <Grid.Col span={3}>
                <Text fz={24} fw={700} ta="center">
                  Step 2:
                </Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Text fz={26}>Set movie preferences 🎬</Text>
              </Grid.Col>
            </Grid>
          </List.Item>

          <List.Item>
            <Grid w={500} align="center">
              <Grid.Col span={3}>
                <Text fz={24} fw={700} ta="center">
                  Step 3:
                </Text>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text fz={26}>Vote on suggestions & get more recommendations 🗳️</Text>
              </Grid.Col>
            </Grid>
          </List.Item>

          <List.Item>
            <Grid w={500} align="center">
              <Grid.Col span={3}>
                <Text fz={24} fw={700} ta="center">
                  Step 4:
                </Text>
              </Grid.Col>
              <Grid.Col span={9}>
                <Text fz={26}>Get final movie selection 🎯</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
        </List>
        <Button
          className={classes.button}
          w={300}
          size="xl"
          radius="lg"
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
          mt="5rem"
        >
          Create New Party 🎬
        </Button>
        <Button
          disabled
          className={classes.button}
          w={300}
          size="xl"
          radius="lg"
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
          mt="1rem"
        >
          Create A Room 🥳
        </Button>
        Coming Soon ...
        {/* Decorative Images */}
        <Image src="/bg-1.png" className={classes.bottomLeftImage} />
        <Image src="/bg-2.png" className={classes.bottomRightImage} />
      </Paper>
    </>
  );
}
