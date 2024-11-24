'use client';

import { useRouter } from 'next/navigation';
import { IconCircleCheck } from '@tabler/icons-react';
import { Button, Grid, Image, List, Paper, rem, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Home.module.css';

export function Home() {
  const router = useRouter(); // Hook for navigation

  const navigateToQuestions = () => {
    router.push('/questions'); // Navigate to the /questions page
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
        <Grid className={classes.grid}>
          <Grid.Col span={6}>
            <Text
              className={classes.title}
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
            >
              ReelMates
            </Text>
            <Text className={classes.subtitle}>Simplify Movie Nights,</Text>
            <Text className={classes.subtitle} component="span">
              Amplify Fun!
            </Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Title ta="center" order={1} pt="2rem">
              Discover the perfect film for your party, effortlessly!
            </Title>
            <List
              className={classes.steplist}
              spacing="xs"
              center
              icon={
                <ThemeIcon color="pink" size={24} radius="xl">
                  <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                </ThemeIcon>
              }
              c="dimmed"
            >
              <List.Item>
                <Grid w="35vw" align="center">
                  <Grid.Col span={3}>
                    <Text className={classes.steptext} fw={700} ta="center">
                      Step 1:
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text className={classes.steptext}>Create a party 🥳</Text>
                  </Grid.Col>
                </Grid>
              </List.Item>

              <List.Item>
                <Grid w="35vw" align="center">
                  <Grid.Col span={3}>
                    <Text className={classes.steptext} fw={700} ta="center">
                      Step 2:
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text className={classes.steptext}>Set movie preferences 🎬</Text>
                  </Grid.Col>
                </Grid>
              </List.Item>

              <List.Item>
                <Grid w="35vw" align="center">
                  <Grid.Col span={3}>
                    <Text className={classes.steptext} fw={700} ta="center">
                      Step 3:
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text className={classes.steptext}>
                      Vote on suggestions & get more recommendations 🗳️
                    </Text>
                  </Grid.Col>
                </Grid>
              </List.Item>

              <List.Item>
                <Grid w="35vw" align="center">
                  <Grid.Col span={3}>
                    <Text className={classes.steptext} fw={700} ta="center">
                      Step 4:
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text className={classes.steptext}>Get final movie selection 🎯</Text>
                  </Grid.Col>
                </Grid>
              </List.Item>
            </List>
          </Grid.Col>
        </Grid>
        <Button
          className={classes.button}
          size="xl"
          radius="lg"
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow', deg: 60 }}
          onClick={navigateToQuestions}
        >
          Create New Party 🎬
        </Button>
        <Button
          disabled
          className={classes.button}
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
