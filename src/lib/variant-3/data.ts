import type { Perspective } from '../variant-1/types';

export const images = [
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1024&q=80&auto=format', // Repeat as needed to fill 12
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1024&q=80&auto=format',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1024&q=80&auto=format',
];

export const perspectives: Perspective[] = [
  {
    title: 'Monolithic Form',
    description: 'Structural integrity meeting aesthetic permanence',
    position: 'top',
  },
  {
    title: 'Material Honesty',
    description: 'The dialogue of raw concrete, steel and light',
    position: 'center',
  },
  {
    title: 'Vertical Urbanism',
    description: 'Redefining the skyline with sculptural precision',
    position: 'center',
  },
  {
    title: 'ENBUILT STUDIO',
    description: 'Built for permanence since 2012',
    position: 'bottom',
  },
];

// Configuration without window access for SSR safety
export const cylinderConfig = {
  radius: 2.5,
  height: 2.0,
  radialSegments: 64,
  heightSegments: 1,
};

export const getCylinderConfig = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return {
    ...cylinderConfig,
    radius: isMobile ? 2.2 : 2.5,
    height: isMobile ? 1.2 : 2.0,
  };
};

export const particleConfig = {
  numParticles: 12,
  particleRadius: 3.3, // cylinderRadius + 0.8
  segments: 20,
  angleSpan: 0.3,
};

export const imageConfig = {
  width: 1024,
  height: 1024,
};
