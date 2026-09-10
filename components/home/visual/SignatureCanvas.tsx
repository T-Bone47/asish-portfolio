"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { isReducedMotion, isTouchDevice } from "@/lib/motion/runtime";

/**
 * Spec §11 & §17–19 — Abstract 3D WebGL Telemetry Enhancement.
 *
 * Strictly progressive enhancement layered underneath the SVG instrument panel.
 * - Abstract 3D spline trajectory with subtle Z-depth
 * - Low-density telemetry signal particles (~60 particles)
 * - Mouse parallax camera tilt (desktop only)
 * - Pauses RAF immediately when off-screen via IntersectionObserver
 * - Full resource disposal on unmount (zero GPU leaks)
 * - Safe context creation fallback (fails gracefully if WebGL is unavailable)
 */
export function SignatureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced motion and skip on touch devices to conserve battery & performance
    if (isReducedMotion() || isTouchDevice()) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animId: number | null = null;
    let isVisible = true;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch (e) {
      console.warn("[SignatureCanvas] WebGL context initialization failed, falling back to SVG:", e);
      return;
    }

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 420;
    renderer.setSize(width, height, false);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 180);

    // 1. Create 3D curve matching the 2D SVG trajectory normalized into 3D coordinate space
    // SVG viewBox: 1200 x 420. Normalized center: (0, 0)
    const points: THREE.Vector3[] = [
      new THREE.Vector3(-80, -25, -15),
      new THREE.Vector3(-55, 15, -5),
      new THREE.Vector3(-30, 20, 5),
      new THREE.Vector3(-5, -5, -8),
      new THREE.Vector3(20, 25, 12),
      new THREE.Vector3(45, 15, 2),
      new THREE.Vector3(70, -5, -10),
      new THREE.Vector3(85, 20, 8),
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(120);
    const splineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

    // Subtle green-accent depth line
    const splineMaterial = new THREE.LineBasicMaterial({
      color: 0x34e27a,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const splineLine = new THREE.Line(splineGeometry, splineMaterial);
    scene.add(splineLine);

    // 2. Telemetry data particles traveling along the 3D spline
    const PARTICLE_COUNT = 50;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleOffsets = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particleOffsets[i] = i / PARTICLE_COUNT;
      const pt = curve.getPointAt(particleOffsets[i]!);
      particlePositions[i * 3] = pt.x;
      particlePositions[i * 3 + 1] = pt.y;
      particlePositions[i * 3 + 2] = pt.z;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x5eeb98,
      size: 2.2,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 12;
      targetY = -y * 8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Visibility-based pause: do NOT run RAF when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !animId) {
          lastTime = performance.now();
          animId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize handler
    const handleResize = () => {
      if (!renderer || !camera || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Render loop
    let lastTime = performance.now();
    let speed = 0.08;

    function animate(time: number) {
      if (!isVisible) {
        animId = null;
        return;
      }

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth camera parallax
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (camera) {
        camera.position.x = currentX;
        camera.position.y = currentY;
        camera.lookAt(0, 0, 0);
      }

      // Progress particles along the 3D spline
      const posAttr = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particleOffsets[i] = (particleOffsets[i]! + speed * delta) % 1;
        const pt = curve.getPointAt(particleOffsets[i]!);
        posArray[i * 3] = pt.x;
        posArray[i * 3 + 1] = pt.y;
        posArray[i * 3 + 2] = pt.z;
      }
      posAttr.needsUpdate = true;

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    // Teardown and GPU resource disposal
    return () => {
      if (animId) cancelAnimationFrame(animId);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      splineGeometry.dispose();
      splineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-60" />
    </div>
  );
}
