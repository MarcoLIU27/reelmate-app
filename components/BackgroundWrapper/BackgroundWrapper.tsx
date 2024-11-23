import { Paper } from '@mantine/core';
import styles from './BackgroundWrapper.module.css';

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      style={{
        position: 'relative', // Ensure Paper is the positioning context
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Layer */}
      <div className={styles.backgroundLayer}></div>

      {/* Foreground Content*/}
      <div className={styles.content}>
        {children}
      </div>
    </Paper>
  );
}

export default BackgroundWrapper;
