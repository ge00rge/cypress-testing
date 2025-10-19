describe('Newsletter', ()=>{
    beforeEach(()=>{
        cy.task('seedDatabase'); // db is seeded so that on each test we start with 2 takeaways and no users.
      })
    it('should display a success message', () => {
        cy.intercept('POST', '/newsletter*', {status: 201}).as('subscribe'); // backend request we want to intercept to localhost:3000/newsletter?anything
        cy.visit('/');
        // cy.get('[data-cy="newsletter-email"]').type('test@example.com'); // common bug
        cy.get('[data-cy="newsletter-email"]').click();
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        
        cy.get('[data-cy="newsletter-submit"]').click(); 
        cy.wait('@subscribe'); // wait for the request to be detected
        cy.contains('Thanks for signing up'); // verify the user is new.
    });

    it('should display validation errors', () => {
        cy.intercept('POST', '/newsletter*', {message: 'Email exists already.'}).as('subscribe');
        cy.visit('/');

        cy.get('[data-cy="newsletter-email"]').click();
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        
        cy.get('[data-cy="newsletter-submit"]').click(); 
        cy.wait('@subscribe'); 
        cy.contains('Email exists already.');

    });
    it('should successfully create a new contact', ()=> {
        cy.request({ // send a request to the api.
            method: 'POST',
            url: '/newsletter',
            body: {email: 'test@example.com'},
            form: true,
        })
        .then(res => {
            expect(res.status).to.eq(201);
        });
    })
});