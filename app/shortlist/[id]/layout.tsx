import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import BackgroundWrapper from '@/components/BackgroundWrapper/BackgroundWrapper';
import { theme } from '@/theme';

export const metadata = {
  title: 'ReelMate - Your Party Movie Picker!',
  description: 'Pick your party movie in a brand new way!',
};

export default function RootLayout({ children }: { children: any }) {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
}
