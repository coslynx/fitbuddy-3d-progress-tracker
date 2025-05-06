import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DirectionalLight, AmbientLight } from 'three';
import { Model } from '@/components/Three/Model';
import 'styles/index.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScrollAnimationType } from 'src/types/types.d';

interface SceneProps {
  scrollAnimation: ScrollAnimationType;
}

const Scene: React.FC<SceneProps> = React.memo(({ scrollAnimation }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.lerp(
        new THREE.Vector3(...scrollAnimation.cameraPosition),
        0.1
      );
    }
  });

  return (
    <Canvas
      shadows
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}
      style={{ background: 'lightblue' }}
    >
      <Suspense fallback={<div className="text-gray-500 p-4">Loading...</div>}>
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[2, 2, 2]}
          intensity={1}
          castShadow
          shadow={{
            mapSize: { width: 1024, height: 1024 },
            bias: -0.0001,
          }}
        />
        <Model scrollAnimation={scrollAnimation} castShadow receiveShadow />
      </Suspense>
    </Canvas>
  );
});

Scene.displayName = 'Scene';

export { Scene };