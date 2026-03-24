import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import TeamHeader from '@/components/team/team-header';
import TeamGalleryClient from '@/components/team/team-gallery';

export const revalidate = 60;

async function getTeamData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${apiUrl}/teams`, { next: { revalidate: 60 } });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function TeamPage() {
  const response = await getTeamData();
  const team = response?.data || [];

  return (
    <main className="min-h-screen bg-[#080a0f] flex flex-col pt-16">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 w-full py-16">
        <TeamHeader />
        <TeamGalleryClient team={team} />
      </div>
      <Footer />
    </main>
  );
}
