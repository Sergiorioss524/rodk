'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useVideoTexture, shaderMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Custom shader material to remove black background (chroma key)
const ChromaKeyMaterial = shaderMaterial(
  { map: new THREE.Texture(), keyColor: new THREE.Color(0, 0, 0), threshold: 0.4 },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D map;
    uniform vec3 keyColor;
    uniform float threshold;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(map, vUv);

      // Calculate difference from key color (black)
      float diff = length(texColor.rgb - keyColor);

      // If pixel is close to black, make it transparent
      float alpha = smoothstep(0.0, threshold, diff);

      gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
    }
  `
);

// Extend the Three.js namespace with our custom material
extend({ ChromaKeyMaterial });

// Declare the custom material type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      chromaKeyMaterial: any;
    }
  }
}

function VideoPlane({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Load video as texture
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
  });

  // Update texture in material
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.map = texture;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[6, 9.5]} />
        <chromaKeyMaterial
          ref={materialRef}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial color="#F7ECE2" opacity={0.3} transparent wireframe />
    </mesh>
  );
}

export default function Logo3D() {
  return (
    <div className="w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        {/* Ambient lighting for subtle effect */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />

        {/* Video Texture on Floating Plane */}
        <Suspense fallback={<LoadingFallback />}>
          <VideoPlane src="/rodk.mp4" />
        </Suspense>
      </Canvas>
    </div>
  );
}
