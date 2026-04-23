import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import TeamGalleryClient from '../components/team/team-gallery';
import TeamHeader from '../components/team/team-header';
import type { TeamMember } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const Route = createFileRoute('/team')({
  loader: async () => {
    try {
      const res = await fetch(`${API_URL}/teams`);
      if (!res.ok) return { team: [] };
      const json = await res.json();
      return { team: (json?.data || []) as TeamMember[] };
    } catch {
      return { team: [] };
    }
  },
  component: TeamPage,
});

function TeamPage() {
  const { team } = Route.useLoaderData();

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

