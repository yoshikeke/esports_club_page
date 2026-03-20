"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 150;

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.15
        )
      );
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 2.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);

    // Lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.08,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener("mousemove", onMouseMove);

    // Animate
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const posArray = particleGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce within bounds
        if (Math.abs(posArray[i * 3]) > 250) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 250) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 100) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update connection lines
      const linePositions: number[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECTION_DISTANCE) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            );
          }
        }
      }
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // Gentle camera movement following mouse
      camera.position.x += (mouse.x * 30 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-auto"
      style={{ pointerEvents: "none" }}
    />
  );
}
