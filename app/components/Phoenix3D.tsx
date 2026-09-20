"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Phoenix3DProps {
  mouseNormalized?: { x: number; y: number };
}

export default function Phoenix3D({ mouseNormalized }: Phoenix3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // Keep mouseRef updated if prop provided
  useEffect(() => {
    if (mouseNormalized) {
      mouseRef.current = mouseNormalized;
    }
  }, [mouseNormalized]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    let isRunning = true;

    // Window-level mouse tracking for 100% reliable tracking everywhere on screen
    const handleGlobalPointerMove = (e: PointerEvent | MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current = { x, y };
    };
    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    window.addEventListener("mousemove", handleGlobalPointerMove, { passive: true });

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 4.9 : 3.85);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Cinematic Lighting for Emberwing Phoenix
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffd580, 3.4);
    sunLight.position.set(4, 5, 4);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x88b0ff, 1.5);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const emberLight = new THREE.PointLight(0xff4500, 4.5, 12);
    emberLight.position.set(0, -2, 1);
    scene.add(emberLight);

    const rimLight = new THREE.PointLight(0xffa500, 3.2, 8);
    rimLight.position.set(0, 1.5, 2.5);
    scene.add(rimLight);

    // Root pivot group
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Head turn shader uniforms (calibrated starting gaze facing straight forward)
    const headUniforms = {
      uHeadYaw: { value: 0.95 },
      uHeadPitch: { value: 0.12 },
      uNeckY: { value: 0.22 },
      uNeckZ: { value: 0.05 },
    };

    let model: THREE.Object3D | null = null;
    const startTime = performance.now();

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/3D-model/Meshy_AI_Emberwing_Phoenix_0920105232_texture.glb",
      (gltf) => {
        model = gltf.scene;

        // Auto-center and fit model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center); // Center pivot

        // Scale: slightly smaller for refined balance (targetScale ~ 2.20 / maxDim)
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.20 / maxDim;
        model.scale.setScalar(targetScale);

        // Inject vertex shader head-turning into material
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.5;
              mat.metalness = 0.3;
              mat.envMapIntensity = 1.35;

              // Custom vertex shader hook for head turn
              mat.onBeforeCompile = (shader) => {
                shader.uniforms.uHeadYaw = headUniforms.uHeadYaw;
                shader.uniforms.uHeadPitch = headUniforms.uHeadPitch;
                shader.uniforms.uNeckY = headUniforms.uNeckY;
                shader.uniforms.uNeckZ = headUniforms.uNeckZ;

                shader.vertexShader = `
                  uniform float uHeadYaw;
                  uniform float uHeadPitch;
                  uniform float uNeckY;
                  uniform float uNeckZ;

                  mat3 makeRotY(float angle) {
                    float c = cos(angle);
                    float s = sin(angle);
                    return mat3(
                      c, 0.0, s,
                      0.0, 1.0, 0.0,
                      -s, 0.0, c
                    );
                  }

                  mat3 makeRotX(float angle) {
                    float c = cos(angle);
                    float s = sin(angle);
                    return mat3(
                      1.0, 0.0, 0.0,
                      0.0, c, -s,
                      0.0, s, c
                    );
                  }

                  ${shader.vertexShader}
                `;

                shader.vertexShader = shader.vertexShader.replace(
                  "#include <begin_vertex>",
                  `
                  #include <begin_vertex>

                  // Local head center calibration in model space
                  float headDist = length(vec3(position.x, position.y - uNeckY, position.z - uNeckZ));
                  float headWeight = smoothstep(0.48, 0.0, headDist);

                  if (headWeight > 0.001) {
                    vec3 headPivot = vec3(0.0, uNeckY, uNeckZ);
                    vec3 localPos = transformed - headPivot;

                    float yawAngle = uHeadYaw * headWeight;
                    float pitchAngle = uHeadPitch * headWeight;

                    mat3 rotY = makeRotY(yawAngle);
                    mat3 rotX = makeRotX(pitchAngle);

                    transformed = headPivot + (rotY * rotX * localPos);
                  }
                  `
                );
              };
            }
          }
        });

        pivot.add(model);
        setLoaded(true);
      },
      undefined,
      (error) => {
        console.error("Error loading Phoenix GLB model:", error);
      }
    );

    // Current animated head rotation state calibrated to straight-facing start
    let curHeadYaw = 0.95;
    let curHeadPitch = 0.12;

    // Render loop with head turning and dead-center placement
    const render = () => {
      if (!isRunning) return;

      if (isVisible) {
        const elapsedTime = (performance.now() - startTime) * 0.001;

        // 1. Calculate Head Turn from Cursor (yaw & pitch)
        // Extreme-left (+0.95) aligns head straight forward; cursor tracks smoothly across screen
        const baseYawOffset = 0.95;
        const targetHeadYaw = baseYawOffset - mouseRef.current.x * 0.85;
        const targetHeadPitch = -mouseRef.current.y * 0.55 + 0.16;

        curHeadYaw = THREE.MathUtils.lerp(curHeadYaw, targetHeadYaw, 0.12);
        curHeadPitch = THREE.MathUtils.lerp(curHeadPitch, targetHeadPitch, 0.12);

        headUniforms.uHeadYaw.value = curHeadYaw;
        headUniforms.uHeadPitch.value = curHeadPitch;

        if (pivot) {
          // 2. Subtle supportive body banking tilt (complementing head turn direction)
          const targetBodyRotY = -mouseRef.current.x * 0.18;
          const targetBodyRotX = -mouseRef.current.y * 0.14;
          const targetBodyRotZ = mouseRef.current.x * 0.14;

          // Positioned a bit further down for optimal text framing and clearance
          const basePosY = isMobile ? -0.90 : -0.82;
          const floatOffset = Math.sin(elapsedTime * 1.8) * 0.04;
          const targetPosY = basePosY + mouseRef.current.y * 0.08 + floatOffset;
          const targetPosX = mouseRef.current.x * 0.1;

          pivot.rotation.y = THREE.MathUtils.lerp(pivot.rotation.y, targetBodyRotY, 0.08);
          pivot.rotation.x = THREE.MathUtils.lerp(pivot.rotation.x, targetBodyRotX, 0.08);
          pivot.rotation.z = THREE.MathUtils.lerp(pivot.rotation.z, targetBodyRotZ, 0.08);

          pivot.position.y = THREE.MathUtils.lerp(pivot.position.y, targetPosY, 0.08);
          pivot.position.x = THREE.MathUtils.lerp(pivot.position.x, targetPosX, 0.08);
        }

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause heavy WebGL rendering only when hero is scrolled completely out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    render();

    // Window resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      const mob = newWidth < 768;

      camera.aspect = newWidth / newHeight;
      camera.position.set(0, 0, mob ? 4.9 : 3.85);
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isRunning = false;
      observer.disconnect();
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
