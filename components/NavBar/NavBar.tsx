import { Anchor, Group, Image } from '@mantine/core';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <>
      <div className={styles.glassEffect}>
        <div className={styles.navBar}>
          {/* Logo Section */}
          <div className={styles.logo}>
            <Image src="/logo.png" height={80} width="auto" alt="Logo" />
          </div>

          {/* Links Section */}
          <Group gap="xl" className={styles.links}>
            <Anchor href="/start" className={styles.link}>
              Home
            </Anchor>
            <Anchor href="/about" className={styles.link}>
              About
            </Anchor>
          </Group>
        </div>
      </div>
    </>
  );
}

export default NavBar;
