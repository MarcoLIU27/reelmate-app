'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button, Group, Image, Loader, Paper, Text, Title } from '@mantine/core';
import classes from './Comparison.module.css';
import { VoteCard } from '@/components/VoteCard/VoteCard';
import shortlistStorage from '@/utils/shortlistStorage';

export function Comparison({ id }: { id: string }) {

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<String>('Loading');
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);

  const router = useRouter();

  const cacheDataLocally = (key: string, data: any) => {
    const dataToStore = JSON.stringify(data);
    if (sessionStorage.getItem(key) !== dataToStore) {
      sessionStorage.setItem(key, dataToStore);
      console.log('Data cached');
    } else {
      console.log('Data already exists in cache');
    }
  };

  useEffect(() => {
    if (shortlist.length > 1) {
      setCurrentPair([shortlist[0], shortlist[1]]);
    } else if (shortlist.length === 1) {
      cacheDataLocally("winner", shortlist[0]);
      router.push(`/winner/${id}`);
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
