import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import debounce from 'lodash.debounce';

gsap.registerPlugin(ScrollTrigger);

type AnimationValues = {
  morphTargetInfluences: number[];
  cameraPosition: [number, number, number];
  color: string;
};

const useScrollAnimation = (): [AnimationValues, React.RefObject<HTMLDivElement>] => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationValues = useRef<AnimationValues>({
    morphTargetInfluences: [0, 0, 0, 0, 0],
    cameraPosition: [0, 0, 5],
    color: '#ffffff',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (document) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = Math.min(1, Math.max(0, scrollTop / documentHeight));
        setScrollProgress(progress);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 10);

    window.addEventListener('scroll', debouncedHandleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  useFrame(() => {
    try {
      const morphTargetInterpolation = gsap.utils.interpolate([0, 0.2, 0.4, 0.6, 0.8, 1], [
        [0, 0, 0, 0, 0],
        [0.2, 0, 0, 0, 0],
        [0.2, 0.4, 0, 0, 0],
        [0.2, 0.4, 0.6, 0, 0],
        [0.2, 0.4, 0.6, 0.8, 0],
        [0.2, 0.4, 0.6, 0.8, 1],
      ]);

      const cameraPositionInterpolation = gsap.utils.interpolate([0, 1], [
        [0, 0, 5],
        [0, 2, 10],
      ]);

      const colorInterpolation = gsap.utils.interpolate([0, 0.5, 1], [
        '#ffffff',
        '#ff0000',
        '#0000ff',
      ]);

      const morphTargetInfluences = morphTargetInterpolation(scrollProgress);
      const cameraPosition = cameraPositionInterpolation(scrollProgress);
      const color = colorInterpolation(scrollProgress);

      if (Array.isArray(morphTargetInfluences) && morphTargetInfluences.length === 5) {
        animationValues.current.morphTargetInfluences = morphTargetInfluences;
      }

      if (Array.isArray(cameraPosition) && cameraPosition.length === 3) {
        animationValues.current.cameraPosition = cameraPosition as [number, number, number];
      }

      if (typeof color === 'string') {
        animationValues.current.color = color;
      }

    } catch (error) {
      console.error('Error in useFrame:', error);
    }
  });

  return [animationValues.current, scrollRef];
};

export { useScrollAnimation };