'use client';

import { useParams } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { Vote } from '@/components/Vote/Vote';

export default function HomePage() {
  const { id } = useParams() as { id: string };
  return (
    <>
      <NavBar />
      <Vote />
      <Footer />
    </>
  );
}
