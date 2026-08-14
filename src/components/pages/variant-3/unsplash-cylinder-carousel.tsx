'use client';

import { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Transform, Texture, Program, Mesh } from 'ogl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

import type { CameraAnimation, ParticleMesh } from '@/lib/variant-1/types';
import { images, perspectives, getCylinderConfig, particleConfig, imageConfig } from '@/lib/variant-3/data';
import {
  drawImageCover,
  getPositionClasses,
  createCylinderGeometry,
  createParticleGeometry,
} from '@/lib/variant-1/utils';
import { cylinderVertex, cylinderFragment, particleVertex, particleFragment } from '@/lib/variant-1/shaders';
import Loader from '@/components/loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollSmoother);

  CustomEase.create('cinematicSilk', '0.45, 0.05, 0.55, 0.95');
  CustomEase.create('cinematicSmooth', '0.25, 0.1, 0.25, 1');
  CustomEase.create('cinematicFlow', '0.33, 0, 0.2, 1');
  CustomEase.create('cinematicLinear', '0.4, 0, 0.6, 1');
}

export function UnsplashCylinderCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const cylinderRef = useRef<Mesh | null>(null);
  const cameraAnimRef = useRef<CameraAnimation>({ x: 0, y: 0, z: 8, rotY: 0 });
  const particlesRef = useRef<ParticleMesh[]>([]);
  const lastRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRef = useRef(0);
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Cinematic Scroll Animations | ENBUILT STUDIO';
    if (!canvasRef.current || !containerRef.current || !smoothWrapperRef.current || !smoothContentRef.current) return;

    const currentCylinderConfig = getCylinderConfig();

    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 4,
      effects: false,
      smoothTouch: 0.1,
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

    const renderer = new Renderer({
      canvas: canvasRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    rendererRef.current = renderer;

    const updateThemeColors = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const bgColor = isLight ? [0.957, 0.961, 0.969, 1] : [0.067, 0.075, 0.102, 1]; // #F4F5F7 vs #11131A
      gl.clearColor(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
      
      const particleColor = isLight ? [0.878, 0.169, 0.169] : [1.0, 0.231, 0.231]; 
      particlesRef.current.forEach(p => {
        p.program.uniforms.uColor.value = particleColor;
      });

      if (cylinderRef.current) {
        cylinderRef.current.program.uniforms.uBgColor.value = [bgColor[0], bgColor[1], bgColor[2]];
      }
    };

    updateThemeColors();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateThemeColors();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    const getResponsiveDimensions = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const maxRadius = isMobile ? 1.8 : isTablet ? 2.2 : 2.5;
      const cylinderHeight = isMobile ? 0.8 : isTablet ? 1.0 : 1.2;
      const cameraZ = isMobile ? 6 : isTablet ? 7 : 8;
      const fov = isMobile ? 50 : 45;

      return {
        cylinderScale: maxRadius / currentCylinderConfig.radius,
        cylinderHeight,
        cameraZ,
        fov,
        isMobile,
      };
    };

    const dimensions = getResponsiveDimensions();

    const cameraOptions: any = { fov: dimensions.fov };
    if (dimensions.isMobile) {
      cameraOptions.aspect = window.innerWidth / window.innerHeight;
    }
    const camera = new Camera(gl, cameraOptions);
    camera.position.set(0, 0, dimensions.cameraZ);
    cameraRef.current = camera;

    const scene = new Transform();
    sceneRef.current = scene;

    const geometry = createCylinderGeometry(gl, currentCylinderConfig);

    const hardwareLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const isMobileDevice = window.innerWidth < 768;
    const safeLimit = isMobileDevice ? 2048 : Math.min(hardwareLimit, 8192);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', {
      willReadFrequently: false,
      alpha: false
    })!;
    const numImages = images.length;

    const totalWidthOriginal = imageConfig.width * numImages;
    const heightOriginal = imageConfig.height;
    const scale = Math.min(1, safeLimit / totalWidthOriginal);

    canvas.width = Math.floor(totalWidthOriginal * scale);
    canvas.height = Math.floor(heightOriginal * scale);

    let loadedImages = 0;
    const imageElements: HTMLImageElement[] = [];

    const circumference = 2 * Math.PI * currentCylinderConfig.radius;
    const textureAspectRatio = imageConfig.height / (imageConfig.width * images.length);
    const idealHeight = circumference * textureAspectRatio;
    const heightCorrection = idealHeight / currentCylinderConfig.height;

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && cylinderRef.current) {
        const currentWidth = window.innerWidth;
        const newDimensions = getResponsiveDimensions();

        if (newDimensions.isMobile && currentWidth === lastWidth) {
          return;
        }
        lastWidth = currentWidth;

        rendererRef.current.setSize(currentWidth, window.innerHeight);

        cameraRef.current.perspective({
          fov: newDimensions.fov,
          aspect: currentWidth / window.innerHeight,
        });

        if (newDimensions.isMobile) {
          cylinderRef.current.scale.set(
            newDimensions.cylinderScale,
            newDimensions.cylinderScale * heightCorrection,
            newDimensions.cylinderScale
          );
        } else {
          cylinderRef.current.scale.set(
            newDimensions.cylinderScale,
            newDimensions.cylinderScale,
            newDimensions.cylinderScale
          );
        }

        if (cameraAnimRef.current.z === 8 || cameraAnimRef.current.z === 7 || cameraAnimRef.current.z === 6) {
          cameraAnimRef.current.z = newDimensions.cameraZ;
        }
      }
    };

    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageElements[index] = img;
        loadedImages++;

        const totalCanvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        if (loadedImages === numImages) {
          imageElements.forEach((img, i) => {
            const xStartExact = (i / numImages) * totalCanvasWidth;
            const xEndExact = ((i + 1) / numImages) * totalCanvasWidth;

            const xPos = Math.floor(xStartExact);
            const xEnd = Math.floor(xEndExact);

            const drawWidthActual = xEnd - xPos;
            drawImageCover(
              ctx,
              img,
              xPos,
              0,
              drawWidthActual,
              canvasHeight
            );
          });

          const texture = new Texture(gl, {
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            generateMipmaps: false
          });

          texture.image = canvas;
          texture.needsUpdate = true;

          const program = new Program(gl, {
            vertex: cylinderVertex,
            fragment: cylinderFragment,
            uniforms: {
              tMap: { value: texture },
              uDarkness: { value: 0.3 },
              uBgColor: { value: [0.067, 0.075, 0.102] }, // Default dark
            },
            cullFace: null,
          });

          const cylinder = new Mesh(gl, { geometry, program });
          cylinder.setParent(scene);
          cylinder.rotation.y = 0.5;
          cylinder.scale.set(dimensions.cylinderScale, dimensions.cylinderScale, dimensions.cylinderScale);
          cylinderRef.current = cylinder;

          setIsLoading(false);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          });

          tl.to(cameraAnimRef.current, {
            x: 0,
            y: 0,
            z: dimensions.cameraZ,
            duration: 1,
            ease: 'cinematicSilk',
          })
            .to(cameraAnimRef.current, {
              x: 0,
              y: 5,
              z: 5,
              duration: 1,
              ease: 'cinematicFlow',
            })
            .to(cameraAnimRef.current, {
              x: 1.5,
              y: 2,
              z: 2,
              duration: 2,
              ease: 'cinematicLinear',
            })
            .to(cameraAnimRef.current, {
              x: 0.5,
              y: 0,
              z: 0.8,
              duration: 3.5,
              ease: 'power1.inOut',
            })
            .to(cameraAnimRef.current, {
              x: -6,
              y: -1,
              z: dimensions.cameraZ,
              duration: 1,
              ease: 'cinematicSmooth',
            });

          tl.to(
            cylinderRef.current.rotation,
            {
              y: '+=28.27',
              duration: 8.5,
              ease: 'none',
            },
            0
          );

          textRefs.current.forEach((textEl, index) => {
            if (!textEl) return;

            const sectionDuration = 100 / perspectives.length;
            const start = index * sectionDuration;
            const end = (index + 1) * sectionDuration;

            const textTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: `${start}% top`,
                end: `${end}% top`,
                scrub: 0.8,
              },
            });

            textTimeline
              .fromTo(
                textEl,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.2,
                  ease: 'cinematicSmooth',
                }
              )
              .to(textEl, {
                opacity: 1,
                duration: 0.6,
                ease: 'none',
              })
              .to(textEl, {
                opacity: 0,
                duration: 0.2,
                ease: 'cinematicSmooth',
              });
          });

          for (let i = 0; i < particleConfig.numParticles; i++) {
            const { geometry: lineGeometry, userData } = createParticleGeometry(
              gl,
              particleConfig,
              i,
              currentCylinderConfig.height
            );

            const lineProgram = new Program(gl, {
              vertex: particleVertex,
              fragment: particleFragment,
              uniforms: {
                uColor: { value: [1.0, 1.0, 1.0] },
                uOpacity: { value: 0.0 },
              },
              transparent: true,
              depthTest: true,
            });

            const particle = new Mesh(gl, {
              geometry: lineGeometry,
              program: lineProgram,
              mode: gl.LINE_STRIP,
            }) as ParticleMesh;

            particle.userData = userData;
            particle.setParent(scene);
            particlesRef.current.push(particle);
          }

          window.addEventListener('resize', handleResize);

          const animate = () => {
            requestAnimationFrame(animate);

            camera.position.set(cameraAnimRef.current.x, cameraAnimRef.current.y, cameraAnimRef.current.z);
            camera.lookAt([0, 0, 0]);

            if (cylinderRef.current) {
              const currentRotation = cylinderRef.current.rotation.y;
              velocityRef.current = currentRotation - lastRotationRef.current;
              lastRotationRef.current = currentRotation;

              const inertiaFactor = 0.15;
              const decayFactor = 0.92;

              momentumRef.current = momentumRef.current * decayFactor + velocityRef.current * inertiaFactor;

              const speed = Math.abs(velocityRef.current) * 100;
              const isRotating = Math.abs(velocityRef.current) > 0.0001;

              particlesRef.current.forEach((particle) => {
                const userData = particle.userData;
                const targetOpacity = isRotating ? Math.min(speed * 3, 0.95) : 0;
                const currentOpacity = particle.program.uniforms.uOpacity.value as number;
                particle.program.uniforms.uOpacity.value = currentOpacity + (targetOpacity - currentOpacity) * 0.15;

                if (isRotating) {
                  const rotationOffset = velocityRef.current * userData.speed * 1.5;
                  const newBaseAngle = userData.baseAngle + rotationOffset;
                  userData.baseAngle = newBaseAngle;

                  const segments = particleConfig.segments;
                  const positions = particle.geometry.attributes.position.data as Float32Array;

                  for (let j = 0; j <= segments; j++) {
                    const t = j / segments;
                    const angle = newBaseAngle + userData.angleSpan * t;
                    const radiusWithSpeed = userData.radius;

                    positions[j * 3] = Math.cos(angle) * radiusWithSpeed;
                    positions[j * 3 + 1] = userData.baseY;
                    positions[j * 3 + 2] = Math.sin(angle) * radiusWithSpeed;
                  }

                  particle.geometry.attributes.position.needsUpdate = true;
                }
              });
            }

            renderer.render({ scene, camera });
          };
          animate();
        }
      };
      img.onerror = () => {
        console.error('Failed to load image:', imageSrc);
        setIsLoading(false);
      };
      img.src = imageSrc;
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      smoother.kill();
    };
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} className="bg-background" classNameLoader="bg-accent" />

      <div ref={sceneContainerRef}>
        <div className="fixed inset-0 w-full h-svh z-0 bg-background transition-colors duration-500">
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none z-10 text-foreground">
          {perspectives.map((perspective, index) => (
            <div
              key={index}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`absolute text-center opacity-0 max-md:w-full ${getPositionClasses(perspective.position)}`}
            >
              <h2 className="text-7xl font-display uppercase tracking-tightest max-md:text-3xl leading-[0.8] text-foreground transition-colors duration-500">{perspective.title}</h2>
              {perspective.description && (
                <p className="text-xl font-condensed uppercase tracking-[0.3em] text-accent mt-4">{perspective.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="fixed bottom-12 right-12 z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60">Scroll</span>
          </div>
        </div>
      </div>

      <div ref={smoothWrapperRef} id="smooth-wrapper" className="relative z-20">
        <div ref={smoothContentRef} id="smooth-content">
          <div ref={containerRef} style={{ height: '500svh' }} />
          <div style={{ height: '100svh' }} />
        </div>
      </div>
    </>
  );
}
