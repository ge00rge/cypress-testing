import { defineConfig } from "cypress";

export default defineConfig({
  // video:true, // control whether a video should be created when running tests with npx cypress run. We can also specify in which folder should be stored or how it should be compressed.
  // screenshotOnRunFailure: true, // whether a screenshot should be created and saved when your test runs and fail.
  // defaultCommandTimeout: 10000, // expectation should be met within the specified timeout (by default 4s)
  // requestTimeout: 10000, // expectation from an API request should occur before the 10s.
  e2e: {
    baseUrl: 'http://localhost:5173', // base url cypress should use when visiting a page
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { // event triggered by cypress whenever the task method is called in one of the tests.
        seedDatabase(filename){
          // Run NodeJS code.
          // ex: make an http request.
          return filename;
        }
      }); 
    },
  },
});
