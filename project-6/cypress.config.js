import { defineConfig } from 'cypress';

import { seed } from './prisma/seed-test';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { // code that is supposed to run outside the browser.
        async seedDatabase() { // method name we invent
          await seed(); // code we want to run (imported function)
          return null;
        }
      })
    },
  },
});
