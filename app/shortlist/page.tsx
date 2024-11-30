'use client';

import { useParams } from 'next/navigation';
import { Comparison } from '@/components/Comparison/Comparison';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';

export default function HomePage() {
  const { id } = useParams() as { id: string };
  return (
    <>
      <NavBar />
      <Comparison />
      <Footer />
    </>
  );
}
