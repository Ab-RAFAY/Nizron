'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';

// Major tech hub coordinates
const ARC_RELATIONS = [
  { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503 },
  { startLat: 35.6762, startLng: 139.6503, endLat: 37.7749, endLng: -122.4194 },
  { startLat: 37.7749, startLng: -122.4194, endLat: 1.3521, endLng: 103.8198 },
  { startLat: 1.3521, startLng: 103.8198, endLat: 50.1109, endLng: 8.6821 },
  { startLat: 50.1109, startLng: 8.6821, endLat: 40.7128, endLng: -74.0060 },
  { startLat: -33.8688, startLng: 151.2093, endLat: 35.6762, endLng: 139.6503 },
  { startLat: -23.5505, startLng: -46.6333, endLat: 40.7128, endLng: -74.0060 },
  { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198 },
];

const PLACES = [
  { lat: 40.7128, lng: -74.0060, name: 'New York', size: 1.5 },
  { lat: 37.7749, lng: -122.4194, name: 'San Francisco', size: 1.5 },
  { lat: 51.5074, lng: -0.1278, name: 'London', size: 1.2 },
  { lat: 50.1109, lng: 8.6821, name: 'Frankfurt', size: 1 },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo', size: 1.5 },
  { lat: 1.3521, lng: 103.8198, name: 'Singapore', size: 1.2 },
  { lat: 28.6139, lng: 77.2090, name: 'Delhi', size: 1 },
];

export default function GlobeAnimated() {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any>({ features: [] });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fetch country boundaries
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(err => console.error("Globe data fetch failed", err));

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = isMobile ? 0.3 : 0.5;
      globe.controls().enableZoom = false;
      globe.pointOfView({ lat: 20, lng: 0, altitude: isMobile ? 2.5 : 2 });
    }
  }, [isMobile, countries]);

  // Performance optimized values
  const hexRes = useMemo(() => isMobile ? 2 : 3, [isMobile]);
  const globeSize = isMobile ? 600 : 1000;

  return (
    <div className="flex justify-center items-center pointer-events-none select-none">
      <Globe
        ref={globeRef}
        height={globeSize}
        width={globeSize}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={!isMobile} // Disable atmosphere on mobile for speed
        atmosphereColor="#4c1d95"
        atmosphereAltitude={0.15}

        // Hex Logic
        hexPolygonsData={countries.features}
        hexPolygonResolution={hexRes}
        hexPolygonMargin={0.3}
        hexPolygonColor={() => 'rgba(99, 102, 241, 0.4)'}

        // Arcs
        arcsData={isMobile ? ARC_RELATIONS.slice(0, 5) : ARC_RELATIONS} // Fewer arcs on mobile
        arcColor={() => ['rgba(168, 85, 247, 0.6)', 'rgba(6, 182, 212, 0.6)']}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcStroke={isMobile ? 0.5 : 1.0}

        // Rings
        ringsData={isMobile ? PLACES.slice(0, 4) : PLACES}
        ringColor={() => '#a855f7'}
        ringMaxRadius="size"
        ringPropagationSpeed={3}
        ringRepeatPeriod={1000}
      />
    </div>
  );
}
