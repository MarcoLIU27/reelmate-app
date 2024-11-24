import { Anchor, Group, Paper, Text } from '@mantine/core';
import classes from './Footer.module.css';

function Footer() {
  return (
    <Paper radius={0} p="md" className={classes.footer}>
      <Group>
        <Text size="sm">© {new Date().getFullYear()} ReelMates. All rights reserved.</Text>
        <Group gap="xs">
          <Anchor href="/about" size="sm" style={{ color: 'white' }}>
            About
          </Anchor>
          <Anchor href="/terms" size="sm" style={{ color: 'white' }}>
            Terms
          </Anchor>
          <Anchor href="/privacy" size="sm" style={{ color: 'white' }}>
            Privacy
          </Anchor>
        </Group>
      </Group>
      <Text size="sm" style={{ color: 'white' }}>
        Background image designed by{' '}
        <Anchor href="www.freepik.com" style={{ color: 'purple' }}>
          Freepik
        </Anchor>
      </Text>
    </Paper>
  );
}
export default Footer;
