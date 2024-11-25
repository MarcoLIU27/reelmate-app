'use client'

import Footer from '@/components/Footer/Footer';
import { Vote } from '@/components/Vote/Vote';
import NavBar from '@/components/NavBar/NavBar';
import { useParams } from 'next/navigation';

export default function HomePage() {

  const { id } = useParams() as { id: string };
  return (
    <>
      <NavBar />
      <Vote id={id}/>
      <Footer />
    </>
  );
}
