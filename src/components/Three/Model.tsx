import React, { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import { ScrollAnimationType } from 'src/types/types.d';

interface ModelProps {
  scrollAnimation: ScrollAnimationType;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

const Model: React.FC<ModelProps> = React.memo(
  ({ scrollAnimation, castShadow = false, receiveShadow = false }) => {
    const modelPath = 'models/hero-model.glb';
    const gltf = useLoader(GLTFLoader, modelPath);
    const model = gltf.scene;
    const materialRef = useRef<THREE.MeshStandardMaterial>(
      new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5, metalness: 0.5 })
    );

    useFrame(() => {
      if (materialRef.current) {
        const color = new THREE.Color(scrollAnimation.color);
        materialRef.current.color.lerp(color, 0.1);
      }
    });

    if (model) {
      model.traverse((object: any) => {
        if (object.isMesh) {
          object.castShadow = castShadow;
          object.receiveShadow = receiveShadow;
          object.material = materialRef.current;
          if (castShadow) {
            object.shadowMap = { width: 1024, height: 1024 };
          }
        }
      });
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(0, 0, 0);
    }

    return <primitive object={model} dispose={null} />;
  }
);

Model.displayName = 'Model';

export { Model };