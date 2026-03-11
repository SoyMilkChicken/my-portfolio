'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 80;

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    requestAnimationFrame(() => {
      if (cancelled) return;

      const w = container.clientWidth || window.innerWidth / 2;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;

      import('three').then(
        ({
          Scene, PerspectiveCamera, WebGLRenderer,
          IcosahedronGeometry, MeshBasicMaterial, Mesh,
          BufferGeometry, BufferAttribute, Points, PointsMaterial,
          AdditiveBlending,
        }) => {
          if (cancelled) return;

          const renderer = new WebGLRenderer({ alpha: true, antialias: true });
          renderer.setSize(w, h);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          container.appendChild(renderer.domElement);

          const scene = new Scene();
          const camera = new PerspectiveCamera(45, w / h, 0.1, 100);
          camera.position.z = 7;

          // ── Rotating wireframe icosahedron ──────────────────────────────
          const icoGeo = new IcosahedronGeometry(2.5, 1);
          const icoMat = new MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
          });
          const ico = new Mesh(icoGeo, icoMat);
          scene.add(ico);

          // ── Floating particles ──────────────────────────────────────────
          // White + AdditiveBlending: invisible on white bg, glows on dark photo
          const positions = new Float32Array(PARTICLE_COUNT * 3);
          const velocities = new Float32Array(PARTICLE_COUNT * 2); // vx, vy per particle

          for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * 8; // x: spread wide
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // z: shallow depth
            velocities[i * 2]     = (Math.random() - 0.5) * 0.003; // x drift
            velocities[i * 2 + 1] = Math.random() * 0.004 + 0.001; // y upward
          }

          const ptGeo = new BufferGeometry();
          ptGeo.setAttribute('position', new BufferAttribute(positions, 3));

          const ptMat = new PointsMaterial({
            color: 0xffffff,
            size: 0.04,
            transparent: true,
            opacity: 0.75,
            blending: AdditiveBlending,
            sizeAttenuation: true,
          });

          const particles = new Points(ptGeo, ptMat);
          scene.add(particles);

          // ── Animation loop ──────────────────────────────────────────────
          let animId: number;
          let last = 0;

          const animate = (t: number) => {
            animId = requestAnimationFrame(animate);
            const delta = Math.min((t - last) / 1000, 0.05);
            last = t;

            // Rotate icosahedron
            ico.rotation.x += delta * 0.15;
            ico.rotation.y += delta * 0.10;

            // Drift particles upward
            const pos = ptGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
              pos[i * 3]     += velocities[i * 2];
              pos[i * 3 + 1] += velocities[i * 2 + 1];
              // Wrap: reset to bottom when particle floats off top
              if (pos[i * 3 + 1] > 3) {
                pos[i * 3 + 1] = -3;
                pos[i * 3]     = (Math.random() - 0.5) * 8;
              }
              // Bounce x gently
              if (Math.abs(pos[i * 3]) > 4) {
                velocities[i * 2] *= -1;
              }
            }
            ptGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
          };

          animId = requestAnimationFrame(animate);

          const onResize = () => {
            const nw = container.clientWidth;
            const nh = container.clientHeight;
            camera.aspect = nw / nh;
            camera.updateProjectionMatrix();
            renderer.setSize(nw, nh);
          };
          window.addEventListener('resize', onResize);

          cleanup = () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            icoGeo.dispose(); icoMat.dispose();
            ptGeo.dispose();  ptMat.dispose();
            renderer.domElement.remove();
          };
        }
      );
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
