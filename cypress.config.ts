import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

// Cypress configuration file
export default defineConfig({
  component: {
    devServer: {
      framework: 'react', // Specifies React as the testing framework
      bundler: 'vite', // Uses Vite as the module bundler
      viteConfig: customViteConfig, // Imports custom Vite configuration
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}", // Defines the pattern for component test files
  },

  e2e: {
    baseUrl: 'http://localhost:3001', // Base URL for end-to-end tests
    setupNodeEvents() {
      // Placeholder for setting up Node event listeners, such as logging or custom tasks
    },
  },
});
