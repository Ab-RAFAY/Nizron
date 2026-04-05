'use client';

import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';

// Major tech hub coordinates
const ARC_RELATIONS = [
  { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278 }, // NY to London
  { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503 }, // London to Tokyo
  { startLat: 35.6762, startLng: 139.6503, endLat: 37.7749, endLng: -122.4194 }, // Tokyo to SF
  { startLat: 37.7749, startLng: -122.4194, endLat: 1.3521, endLng: 103.8198 }, // SF to Singapore
  { startLat: 1.3521, startLng: 103.8198, endLat: 50.1109, endLng: 8.6821 }, // Singapore to Frankfurt
  { startLat: 50.1109, startLng: 8.6821, endLat: 40.7128, endLng: -74.0060 }, // Frankfurt to NY
  { startLat: -33.8688, startLng: 151.2093, endLat: 35.6762, endLng: 139.6503 }, // Sydney to Tokyo
  { startLat: -23.5505, startLng: -46.6333, endLat: 40.7128, endLng: -74.0060 }, // Sao Paulo to NY
  { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198 }, // Delhi to Singapore
];

const PLACES = [
  { lat: 40.7128, lng: -74.0060, name: 'New York (US-East)', size: 1.5 },
  { lat: 37.7749, lng: -122.4194, name: 'San Francisco (US-West)', size: 1.5 },
  { lat: 51.5074, lng: -0.1278, name: 'London (EU-West)', size: 1.2 },
  { lat: 50.1109, lng: 8.6821, name: 'Frankfurt (EU-Central)', size: 1 },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo (AP-East)', size: 1.5 },
  { lat: 1.3521, lng: 103.8198, name: 'Singapore (AP-South)', size: 1.2 },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney (AP-Southeast)', size: 1 },
  { lat: -23.5505, lng: -46.6333, name: 'Sao Paulo (SA-East)', size: 1 },
  { lat: 28.6139, lng: 77.2090, name: 'Delhi (AP-South)', size: 1 },
];

export default function GlobeAnimated() {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any>({ features: [] });
  let [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch high-res country boundaries specifically to render them as technical hexes
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5; // Slightly slower, more professional
      globeRef.current.controls().enableZoom = false; // Prevent user zooming ruining layout
      // Add a slight tilt to the camera for a better dramatic angle
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2 });
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div style={{ pointerEvents: 'none' }} className="flex justify-center items-center">
      <Globe
        ref={globeRef}
        height={1000}
        width={1000}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#4c1d95" // Deep purple glow around the earth
        atmosphereAltitude={0.15}

        // Remove standard map images for a purely data-driven aesthetic
        // Use hex polygons to draw the landmasses instead of standard borders
        hexPolygonsData={countries.features}
        hexPolygonResolution={3} // How granular the hexes are
        hexPolygonMargin={0.3} // Spacing between hexes
        hexPolygonColor={() => 'rgba(99, 102, 241, 0.4)'} // Slate/Indigo for landmasses

        // Arcs (Data routes)
        arcsData={ARC_RELATIONS}
        arcColor={() => ['rgba(168, 85, 247, 0.6)', 'rgba(6, 182, 212, 0.6)']} // Subtle glow instead of opaque neon
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500} // Speed of the packets travelling
        arcsTransitionDuration={1000}
        arcStroke={1.0} // Thinner bounds

        // Glowing Rings (Data Centers)
        ringsData={PLACES}
        ringColor={() => '#a855f7'}
        ringMaxRadius="size"
        ringPropagationSpeed={3}
        ringRepeatPeriod={1000}
      />
    </div>
  );
}
