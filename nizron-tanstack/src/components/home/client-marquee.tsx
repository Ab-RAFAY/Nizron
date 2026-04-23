import React from 'react';

// To add new clients, simply add an object to this array.
// Use standard placeholder text or real paths (e.g. '/clients/logo1.png').
const clients = [
  { id: 1, name: 'Client Alpha', logo: '/globe.svg' },
  { id: 2, name: 'Tech Solutions', logo: '/next.svg' },
  { id: 3, name: 'Global Finance', logo: '/vercel.svg' },
  { id: 4, name: 'Retail Giant', logo: '/globe.svg' },
  { id: 5, name: 'Cloud Corp', logo: '/next.svg' },
  { id: 6, name: 'Data Dynamics', logo: '/vercel.svg' },
  { id: 7, name: 'PEL', logo: '/Pel.png' },

];

export default function ClientMarquee() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-24" />; // Placeholder for server-side
  }

  // Dual-track implementation for absolute seamlessness
  const MarqueeTrack = () => (
    <div className="flex shrink-0 space-x-24 items-center px-12">
      {clients.map((client, index) => (
        <div
          key={`${client.id}-${index}`}
          className="flex items-center justify-center transition-all duration-500 group"
        >
          <img
            src={client.logo}
            alt={client.name}
            width={120}
            height={40}
            className="object-contain h-7 md:h-12 opacity-40 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
            style={{ width: 'auto' }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="w-full overflow-hidden mt-8 md:mt-12 mb-20 py-4 relative group"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div className="flex w-max animate-marquee">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  );
}
