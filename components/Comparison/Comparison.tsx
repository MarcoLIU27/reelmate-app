'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Loader, Paper, Text, Title } from '@mantine/core';
import { VoteCard } from '@/components/VoteCard/VoteCard';
import shortlistStorage from '@/utils/shortlistStorage';
import classes from './Comparison.module.css';

export function Comparison() {
  const [loading, _setLoading] = useState(false);
  const [loadingText, _setLoadingText] = useState<string>('Loading');
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);

  const router = useRouter();

  const cacheDataLocally = (key: string, data: any) => {
    const dataToStore = JSON.stringify(data);
    if (sessionStorage.getItem(key) !== dataToStore) {
      sessionStorage.setItem(key, dataToStore);
    }
  };

  useEffect(() => {
    if (shortlist.length > 1) {
      setCurrentPair([shortlist[0], shortlist[1]]);
    } else if (shortlist.length === 1) {
      cacheDataLocally('winner', shortlist[0]);
      router.push('/winner');
    }
  }, [shortlist]);

  useEffect(() => {
    const shortlist = shortlistStorage.getAll();
    setShortlist(shortlist);
  }, []);

  // Handle user selection
  const handleVote = (selected: string) => {
    setShortlist((prev) => {
      const remaining = prev.slice(2); // Remove the current pair
      return [...remaining, selected]; // Add the selected item to the next round
    });
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
          currentPair && (
            <>
              <div className={classes.content}>
                <Paper className={classes.progress}>
                  <Flex className={classes.stepperWrapper} justify="center" align="center">
                    {/* <Stepper classNames={classes} active={active} onStepClick={setActive}>
                      <Stepper.Step description="10 -> 5" />
                      <Stepper.Step description="5 -> 3" />
                      <Stepper.Step description="3 -> 2" />
                      <Stepper.Step description="2 -> 1" />
                    </Stepper> */}
                    <Title order={3}>Select the one you feel like watching more</Title>
                  </Flex>
                </Paper>
                {/* Top Card */}
                <div
                  className={classes.leftCard}
                  style={{ borderRight: 'solid', borderColor: 'white' }}
                >
                  <VoteCard movieId={currentPair[0]} onVote={() => handleVote(currentPair[0])} />
                </div>
                {/* Bottom Card */}
                <div className={classes.rightCard}>
                  <VoteCard movieId={currentPair[1]} onVote={() => handleVote(currentPair[1])} />
                </div>
              </div>
            </>
          )
        )}
      </Paper>
    </>
  );
}
