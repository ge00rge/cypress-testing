// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// create custom command:
Cypress.Commands.add('submitForm', ()=> {
    cy.get('[data-cy="contact-btn-submit"]').click();
});

// create custom query:
Cypress.Commands.addQuery('getById', (id)=> {
    const getFunction = cy.now('get', `[data-cy="${id}"]`) // this avoid the test from failing in headless mode. We prepare a command for future execution in custom query. 
    return () => {                      
        getFunction();
        return cy.get(); // function retried by cypress within the 4 sec timeframe.
    }    
});