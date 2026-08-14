/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import { getPositionClasses } from '@/lib/variant-2/utils';
import { scenePerspectives } from '@/lib/variant-2/scene-data';

import * as THREE from 'three';
import Loader from '@/components/loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

function CyberpunkBuilding() {
  const { scene } = useGLTF('./cyberpunk_skyscraper.glb');

  useEffect(() => {
    if (scene) {
      scene.scale.set(3, 3, 3);
      scene.position.set(0, 0, 0);
      
      // Update materials to be theme-aware if needed
      scene.traverse((node: any) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} />;
}

function AnimatedCamera({ cameraAnimRef, targetAnimRef }: any) {
  const cameraRef = useRef<any>(null);
  const { set } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(cameraAnimRef.current.x, cameraAnimRef.current.y, cameraAnimRef.current.z);
      cameraRef.current.lookAt(targetAnimRef.current.x, targetAnimRef.current.y, targetAnimRef.current.z);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={45} near={1} far={1000} position={[0, 5, 10]} />;
}

function Scene({ cameraAnimRef, targetAnimRef }: any) {
  const { scene } = useThree();

  useEffect(() => {
    if (scene) {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const bgColor = isLight ? new THREE.Color('#F4F5F7') : new THREE.Color('#11131A');
      
      scene.fog = new THREE.Fog(bgColor, 15, 45);
      scene.background = bgColor;
    }
  }, [scene]);

  // Observer for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' && scene) {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          const bgColor = isLight ? new THREE.Color('#F4F5F7') : new THREE.Color('#11131A');
          scene.fog = new THREE.Fog(bgColor, 15, 45);
          scene.background = bgColor;
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [scene]);

  return (
    <>
      <AnimatedCamera cameraAnimRef={cameraAnimRef} targetAnimRef={targetAnimRef} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.6} />
      <pointLight position={[0, 50, 20]} intensity={0.8} color="#FF3B3B" />

      <CyberpunkBuilding />
    </>
  );
}

export default function CinematicSceneShowcase() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cameraAnimRef = useRef({ x: -20, y: 0, z: 0 });
  const targetAnimRef = useRef({ x: 0, y: 15, z: 0 });
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Skyscraper Cinematic | ENBUILT STUDIO';
    if (!containerRef.current || !smoothWrapperRef.current || !smoothContentRef.current) return;

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    ScrollSmoother.create({
      wrapper: smoothWrapperRef.current!,
      content: smoothContentRef.current!,
      smooth: 4,
      effects: false,
      smoothTouch: 2,
    });

    const setProgressWidth = gsap.quickSetter(progressBarRef.current, 'width', '%');
    const setProgressText = gsap.quickSetter(progressTextRef.current, 'textContent');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          setProgressWidth(progress);
          setProgressText(Math.round(progress).toString().padStart(3, '0') + '%');
        },
      },
    });

    scenePerspectives.forEach((perspective) => {
      const startProgress = perspective.scrollProgress.start / 100;
      const endProgress = perspective.scrollProgress.end / 100;

      tl.to(
        cameraAnimRef.current,
        {
          x: perspective.camera.x,
          y: perspective.camera.y,
          z: perspective.camera.z,
          duration: endProgress - startProgress,
          ease: 'none',
        },
        startProgress
      );

      tl.to(
        targetAnimRef.current,
        {
          x: perspective.target.x,
          y: perspective.target.y,
          z: perspective.target.z,
          duration: endProgress - startProgress,
          ease: 'none',
        },
        startProgress
      );
    });

    // Fade out scene when footer approaches
    gsap.to(sceneContainerRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom 100%',
        end: 'bottom 50%',
        scrub: true,
      }
    });

    scenePerspectives.forEach((perspective, index) => {
      const textEl = textRefs.current[index];
      if (textEl) {
        if (perspective.hideText) {
          gsap.set(textEl, { opacity: 0, pointerEvents: 'none' });
          return;
        }

        const textTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${perspective.scrollProgress.start}% top`,
            end: `${perspective.scrollProgress.end}% top`,
            scrub: 0.5,
          },
        });

        textTimeline
          .fromTo(
            textEl,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out',
            }
          )
          .to({}, { duration: 0.5 })
          .to(textEl, {
            x: 50,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          });
      }
    });

    return () => {
      clearTimeout(loadingTimer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} className="bg-background" classNameLoader="bg-accent" />
      
      <div ref={sceneContainerRef}>
        <div className="fixed inset-0 w-full h-svh z-0 bg-background transition-colors duration-500">
          <Canvas
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
            shadows
          >
            <Scene cameraAnimRef={cameraAnimRef} targetAnimRef={targetAnimRef} />
          </Canvas>
        </div>

        {/* Progress Bar */}
        <div className="fixed left-1/2 -translate-x-1/2 bottom-[13svh] z-40 pointer-events-none w-[250px]">
          <div className="absolute -top-3 left-0 w-3 h-3 border-l border-t border-accent/20" />
          <div className="absolute -top-3 right-0 w-3 h-3 border-r border-t border-accent/20" />

          <div className="relative h-px bg-accent/10">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 h-full bg-accent shadow-[0_0_8px_rgba(255,59,59,0.5)]"
              style={{ width: '0%' }}
            />
          </div>

          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <span ref={progressTextRef} className="text-[10px] font-condensed font-bold text-accent tracking-[0.2em]">
              000%
            </span>
          </div>
        </div>

        <div className="fixed inset-0 pointer-events-none z-10">
          {scenePerspectives.map((perspective, index) => (
            <div
              key={index}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`absolute max-md:w-full ${getPositionClasses(perspective.position)}`}
            >
              <h2 className="text-[6vw] max-md:text-4xl font-display leading-[0.9] mb-2 tracking-tightest text-foreground uppercase">
                {perspective.title}
              </h2>
              <p className="text-[1.25vw] max-md:text-sm font-condensed font-bold tracking-[0.3em] text-accent uppercase">
                {perspective.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div ref={smoothWrapperRef} id="smooth-wrapper" className="relative z-20">
        <div ref={smoothContentRef} id="smooth-content">
          <div ref={containerRef} style={{ height: '900svh' }} />
          <div style={{ height: '100svh' }} />
        </div>
      </div>
    </>
  );
}

useGLTF.preload('./cyberpunk_skyscraper.glb');
