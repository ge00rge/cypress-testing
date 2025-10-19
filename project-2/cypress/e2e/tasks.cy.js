/// <reference types="Cypress" />

describe('tasks management', () => {
    it('should open and close the new task model', ()=>{
        cy.visit('http://localhost:5173/');
        
        cy.contains('Add Task').click(); // yields the elements that contain the 'Add Task' text
        cy.get('.backdrop').click({force: true}); // with the obj config, we are forcing cypress to click the backdrop class.
        cy.get('.backdrop').should('not.exist'); // checks that the modal is gone.
        cy.get('.modal').should('not.exist'); 
        
        cy.contains('Add Task').click();
        cy.contains('Cancel').click(); // press cancel button to close modal.
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist'); 
    });

    it('should create a new task', ()=>{
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click(); // we create a task
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some description');
        cy.get('.modal').contains('Add Task').click();

        cy.get('.backdrop').should('not.exist'); // check modal has been closed.
        cy.get('.modal').should('not.exist'); 

        cy.get('.task').should('have.length', 1); // check the task has been added.
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('Some description');
    })

    it('should validate user input', ()=> {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide values');
    })

    it('should filter tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some description');
        cy.get('#category').select('🚨 Urgent'); // select.('urgent') selecting the value instead of the text would also work.
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);

        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
    })

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('Task 1');
        cy.get('#summary').type('First task');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.contains('Add Task').click();
        cy.get('#title').type('Task 2');
        cy.get('#summary').type('Second task');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 2);
        cy.get('.task').first().contains('First task');
        cy.get('.task').eq(1).contains('Second task');

    })
});