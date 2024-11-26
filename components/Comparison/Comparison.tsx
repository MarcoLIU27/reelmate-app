'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Paper, Text, Title } from '@mantine/core';
import classes from './Comparison.module.css';
import { VoteCard } from '@/components/VoteCard/VoteCard';

export function Comparison({ id }: { id: string }) {

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<String>('Loading');
  const [shortlist, setShortlist] = useState<string[]>(['1312697', '1005981', '57395', '86282', '45576']);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const router = useRouter();

  const getCachedData = (key: string) => {
    const cached = sessionStorage.getItem(key);
    console.log('get cached data');
    return cached ? JSON.parse(cached) : null;
  };

  useEffect(() => {
    if (shortlist.length > 1) {
      setCurrentPair([shortlist[0], shortlist[1]]);
    } else if (shortlist.length === 1) {
      setWinner(shortlist[0]);
      router.push(`/winner/${id}`);
    }
  }, [shortlist]);

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
                {/* Top Card */}
                <div className={classes.leftCard} style={{ borderRight: 'solid', borderColor: 'white' }}>
                  <VoteCard
                    movieId={currentPair[0]}
                    onVote={() => handleVote(currentPair[0])}
                  />
                </div>
                {/* Bottom Card */}
                <div className={classes.rightCard}>
                  <VoteCard movieId={currentPair[1]} onVote={() => handleVote(currentPair[1])}
                  />
                </div>
              </div>
            </>
          )
        )}
      </Paper>
    </>
  );
}
