import React from 'react';
import 'styles/index.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
}

interface FeaturesProps {
  scrollAnimation: any;
}

const Features: React.FC<FeaturesProps> = React.memo(({ scrollAnimation }) => {
  const featuresData: FeatureItem[] = [
    {
      title: 'Goal Setting',
      description:
        'Define your fitness objectives, set personalized goals, and track your progress effortlessly.',
      icon: (
        <svg
          aria-label="Goal Setting Icon"
          className="w-6 h-6 text-accent-DEFAULT"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
      progress: 75,
    },
    {
      title: 'Progress Tracking',
      description:
        'Monitor your daily, weekly, and monthly progress with interactive charts and detailed statistics.',
      icon: (
        <svg
          aria-label="Progress Tracking Icon"
          className="w-6 h-6 text-accent-DEFAULT"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 17v2c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-2m-2-5l-4 4-4-4M12 4v12" />
        </svg>
      ),
      progress: 50,
    },
    {
      title: 'Social Sharing',
      description:
        'Share your achievements with friends and family, and celebrate milestones together.',
      icon: (
        <svg
          aria-label="Social Sharing Icon"
          className="w-6 h-6 text-accent-DEFAULT"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M7 8h-2M17 8h2M12 8v2m-2 3H5M19 11h-2M12 11v2m-2 3H5M15 14h2" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="7" cy="5" r="1" />
          <circle cx="17" cy="5" r="1" />
        </svg>
      ),
      progress: 25,
    },
  ];

  interface FeatureCardProps {
    feature: FeatureItem;
  }

  const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ feature }) => {
    return (
      <div className="p-4 rounded-lg shadow-md bg-secondary">
        <div className="flex items-center mb-2">
          {feature.icon}
          <h3 className="font-montserrat text-lg ml-2 text-accent-DEFAULT">
            {feature.title}
          </h3>
        </div>
        <p className="font-open-sans text-md text-gray-700 dark:text-gray-300">
          {feature.description}
        </p>
        <div className="mt-4">
          <label
            htmlFor={`${feature.title}-progress`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Progress:
          </label>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary">
              <div
                style={{ width: `${feature.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent-DEFAULT"
              ></div>
            </div>
            <span className="sr-only">{feature.progress}% Complete</span>
          </div>
        </div>
      </div>
    );
  });

  FeatureCard.displayName = 'FeatureCard';

  return (
    <div
      id="features"
      className="container mx-auto py-12"
    >
      <h2 className="font-montserrat text-3xl text-accent-DEFAULT text-center mb-8">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
      <try>
        {/* Placeholder for 3D scene */}
        <div className="mt-8 p-4 rounded-lg shadow-md bg-secondary text-center">
          <p className="font-open-sans text-md text-gray-700 dark:text-gray-300">
            [Placeholder for Interactive 3D Scene]
          </p>
        </div>
      </try>
      <catch (error: any)>
        <div className="text-red-500 p-4">
          Oops! Something went wrong loading the 3D scene. Please try again
          later.
        </div>
      </catch>
    </div>
  );
});

Features.displayName = 'Features';

export { Features };