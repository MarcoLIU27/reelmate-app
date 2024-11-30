'use client';

import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { Winner } from '@/components/Winner/Winner';

export default function HomePage() {
  const { id } = useParams() as { id: string };
  return (
    <>
      <NavBar />
      <Winner />
      <Footer />
    </>
  );
}
