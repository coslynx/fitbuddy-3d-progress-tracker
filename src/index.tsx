import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import 'styles/index.css';

const appTitle = process.env.VITE_APP_TITLE || 'Fitness Tracker MVP';
document.title = appTitle;

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element with id "root" not found.');
  document.body.innerHTML = '<p>Error: Root element not found. Please ensure your HTML includes an element with id="root".</p>';
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}