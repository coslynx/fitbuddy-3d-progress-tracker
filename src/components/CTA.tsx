import React from 'react';
import { Scene } from '@/components/Three/Scene';
import 'styles/index.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CTAProps {
  // No props expected
}

const CTA: React.FC<CTAProps> = React.memo(() => {
  const scrollAnimation = useScrollAnimation();

  return (
    <section
      id="cta"
      className="min-h-screen flex flex-col justify-center items-center bg-primary container mx-auto"
    >
      <try>
        <Scene scrollAnimation={scrollAnimation} />
        <h1 className="font-montserrat text-4xl text-secondary text-center sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Ready to Track Your Progress?
        </h1>
        <button
          onClick={() => {
            window.location.href = '#features';
          }}
          className="font-montserrat bg-accent-DEFAULT text-secondary rounded-full py-2 px-6 mt-8 hover:bg-accent-dark transition-colors duration-300"
        >
          Explore Features
        </button>
      </try>
      <catch (error: any)>
        <div className="text-red-500 p-4">
          Oops! Something went wrong loading the 3D scene. Please try again later.
        </div>
      </catch>
    </section>
  );
});

CTA.displayName = 'CTA';

export { CTA };