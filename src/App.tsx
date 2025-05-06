import React from 'react';
import { Hero } from '@components/Hero';
import { Features } from '@components/Features';
import { CTA } from '@components/CTA';
import 'styles/index.css';

function App() {
  return (
    <div className="bg-secondary text-gray-800 font-open-sans antialiased min-h-screen">
      <React.StrictMode>
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <Features />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTA />
        </ErrorBoundary>
      </React.StrictMode>
    </div>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = (error: Error, errorInfo: React.ErrorInfo) => {
      console.error('Caught an error: ', error, errorInfo);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="text-red-500 p-4">
        Oops! Something went wrong. Please try again later.
      </div>
    );
  }

  return children;
}

export default App;