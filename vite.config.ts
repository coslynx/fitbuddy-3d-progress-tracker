import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Configures Vite for a React application using TypeScript.
 * @param {string} mode - The application mode (e.g., 'development', 'production').
 * @returns {import('vite').UserConfigExport} - The Vite configuration object.
 */
export default defineConfig(({ mode }) => {
  /**
   * Load environment variables from .env files.
   * @param {string} mode - The application mode (e.g., 'development', 'production').
   * @param {string} process.cwd() - Get the current working directory
   * @param {string} prefix - The prefix for the environment variables
   */
  const env = loadEnv(mode, process.cwd(), '');

  /**
   * Base URL for serving Three.js assets.
   * @type {string}
   */
  const THREE_PUBLIC_PATH = env.VITE_THREE_PUBLIC_PATH || '/';

  /**
   * Path to Draco decoder files.
   * @type {string}
   */
  const THREE_DRACO_DECODER_PATH = env.THREE_DRACO_DECODER_PATH || '/draco/';

  /**
   * Boolean indicating whether to use Draco compression.
   * @type {boolean}
   */
  const THREE_GLTF_LOADER_DRACO = env.THREE_GLTF_LOADER_DRACO === 'true';

  /**
   * Path to KTX2 transcoder files.
   * @type {string}
   */
  const THREE_KTX2_TRANSCODER = env.THREE_KTX2_TRANSCODER || '/ktx2/';

  /**
   * Path to models.
   * @type {string}
   */
  const THREE_MODEL_PATH = env.THREE_MODEL_PATH || '/models/';

  return {
    /**
     * The base URL for serving static assets.
     */
    base: THREE_PUBLIC_PATH,

    /**
     * Vite Dev Server configurations
     */
    server: {
      /**
       * Configure the ViteDevServer options to serve static assets from the correct directory
       */
      fs: {
        allow: [process.cwd()],
      },
    },
    /**
     *  Esbuild Options
     */
    esbuild: {
      /**
       *  Ensure the JSX transform is enabled.
       */
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      /**
       *  Enable JSX automatic runtime
       */
      jsxInject: `import React from 'react'`,
    },

    /**
     *  Alias Configuration
     */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },

    /**
     *  File Serving
     */
    mimeTypes: {
      'model/gltf+json': ['glTF'],
    },

    /**
     *  Plugins
     */
    plugins: [
      /**
       *  Enable the React plugin
       */
      react() as Plugin,
    ],
    /**
     * Build Options
     */
    build: {
      /**
       *  Configure the chunk size to prevent large files being generated
       */
      chunkSizeWarningLimit: 500,
      /**
       *  Rollup Options
       */
      rollupOptions: {
        /**
         *  Add manual chunks to improve caching
         */
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
  };
});