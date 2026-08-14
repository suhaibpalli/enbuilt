export interface ScenePerspective {
  title: string;
  subtitle: string;
  position:
    | 'top'
    | 'top-left'
    | 'left'
    | 'right'
    | 'center'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  camera: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number }; // in radians
  scrollProgress: { start: number; end: number }; // percentage 0-100
  hideText?: boolean; // Added flag to hide text for transition sections
}

export const scenePerspectives: ScenePerspective[] = [
  {
    title: 'MONOLITHIC',
    subtitle: 'The Core of Urban Density',
    position: 'center',
    camera: { x: 0, y: 2, z: 10 },
    target: { x: 0, y: 5, z: 0 },
    scrollProgress: { start: 0, end: 11.9 },
  },
  {
    title: 'ENBUILT',
    subtitle: 'Structural Honesty in Form',
    position: 'left',
    camera: { x: 3, y: 8, z: 10 },
    target: { x: 0, y: 10, z: 0 },
    scrollProgress: { start: 11.9, end: 23.7 },
  },
  {
    title: 'PERMANENCE',
    subtitle: 'Designed for the Patina of Time',
    position: 'right',
    camera: { x: -10, y: 15, z: 0 },
    target: { x: 0, y: 15, z: 0 },
    scrollProgress: { start: 23.7, end: 35.6 },
  },
  {
    title: 'ELEVATION',
    subtitle: 'Rising Above Expectations',
    position: 'top-left',
    camera: { x: -10, y: 22, z: 0 },
    target: { x: 0, y: 25, z: 0 },
    scrollProgress: { start: 35.6, end: 45.8 },
  },
  {
    title: '',
    subtitle: '',
    position: 'top-right',
    camera: { x: 5, y: 35, z: 5 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 45.8, end: 52.5 },
    hideText: true,
  },
  {
    title: 'VISION',
    subtitle: 'A New Urban Perspective',
    position: 'center',
    camera: { x: 5, y: 30, z: 10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 52.5, end: 62.7 },
  },
  {
    title: 'SYNERGY',
    subtitle: 'Technology Meeting Design',
    position: 'bottom-right',
    camera: { x: 5, y: 25, z: 10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 62.7, end: 69.5 },
  },
  {
    title: 'FUTURE',
    subtitle: 'Legacy of the Next Generation',
    position: 'bottom-left',
    camera: { x: 15, y: 20, z: 5 },
    target: { x: 0, y: 24, z: 0 },
    scrollProgress: { start: 69.5, end: 77.9 },
  },
  {
    title: 'INTEGRITY',
    subtitle: 'Reaching Architectural Heights',
    position: 'top',
    camera: { x: 25, y: 15, z: 0 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 77.9, end: 84.7 },
  },
  {
    title: 'ENBUILT STUDIO',
    subtitle: 'Built for Permanence since 2012',
    position: 'center',
    camera: { x: 20, y: 20, z: -10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 84.7, end: 100 },
  },
];
