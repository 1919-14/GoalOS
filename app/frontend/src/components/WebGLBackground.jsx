import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = 14 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 1.5 + 0.3;

      // Mostly white/grey, occasional blue tint
      const isBlueTinted = Math.random() > 0.85;
      colors[i * 3]     = isBlueTinted ? 0.3 : 0.6 + Math.random() * 0.4;
      colors[i * 3 + 1] = isBlueTinted ? 0.5 : 0.6 + Math.random() * 0.4;
      colors[i * 3 + 2] = isBlueTinted ? 1.0 : 0.6 + Math.random() * 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;
          float wave = sin(pos.x * 0.3 + uTime * 0.5) * 0.25
                     + cos(pos.y * 0.3 + uTime * 0.4) * 0.25;
          pos.z += wave;

          float dist = length(uMouse - pos.xy);
          float influence = smoothstep(4.0, 0.0, dist);
          pos.z += influence * 0.8;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = size * uPixelRatio * (300.0 / -mvPos.z);

          float depth = smoothstep(-20.0, 5.0, pos.z);
          vAlpha = depth * (0.3 + influence * 0.5);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = (1.0 - d * 2.0) * vAlpha;
          gl_FragColor = vec4(vColor, alpha * 0.7);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tracking
    const mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animId;
    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;
      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.set(mouse.x * 6, mouse.y * 4);
      particles.rotation.y = time * 0.04;
      particles.rotation.x = time * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="webgl-canvas"
      style={{ opacity: 0.6 }}
    />
  );
}
