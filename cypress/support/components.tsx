// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// More details: https://on.cypress.io/configuration
// ***********************************************************

// Import Cypress commands for test execution
import './commands';

// Alternatively, CommonJS syntax can be used:
// require('./commands');

import React from 'react';
import { mount, MountOptions, MountReturn } from 'cypress/react18';
import { MemoryRouterProps, MemoryRouter } from 'react-router-dom';

// Extend the Cypress namespace to include custom commands
// This allows TypeScript to recognize the custom 'mount' command
// Alternatively, definitions can be placed in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of the spec file.
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}

// Custom Cypress command to mount React components within a MemoryRouter
Cypress.Commands.add('mount', (component, options = {}) => {
  // Extract router props and mount options
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  
  // Wrap the component with MemoryRouter for testing navigation-dependent components
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>;

  return mount(wrapped, mountOptions);
});

// Example usage of the custom mount command in tests:
// cy.mount(<MyComponent />);
