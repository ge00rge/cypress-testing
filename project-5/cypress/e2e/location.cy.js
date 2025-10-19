/// <reference types="cypress" />

// we will use stubs to replace the browser API getting current location (in main.js line 15) and copying a URL to our clipboard (in main.js line 73):

describe('share location', () => {
  beforeEach(()=>{                                              // good way of re-using stubs across tests.
    cy.clock();  // clock will be manipulated before test runs.
    cy.fixture('user-location.json').as('userLocation'); // to access fixture data.
    cy.visit('/').then((win) => { // visit yields the window obj
      cy.get('@userLocation').then(fakePosition => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition') // replace default getCurrentPosition (in main.js line 15) by a hardcoded fake call.
        .as('getUserPosition').callsFake((cb)=>{ // pass callback function as param and use it to simulate what 'getCurrentPosition' is supposed to do.
                                                 // we don't really care if the testing of the actual fetching works (we only test our app) therefore simulate that step.
                                                 // the arrow function replaces getCurrentPosition when called by our app when Cypress visits our website.
          setTimeout(()=>{                       // the setTimeout is given to allow the UI to change in between, so callback will be called after 100 ms
            cb(fakePosition);                    // with this we test the website behaves correctly before and after data is fetched.
          }, 100);
        });
      })
    
      cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves(); // simulate the copy of the location url to the clipboard.
    
      cy.spy(win.localStorage, 'setItem').as('storeLocation');
      cy.spy(win.localStorage, 'getItem').as('getStoredLocation');

    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called'); // check if stubbed function has been called.
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });


  it('should share a location URL', ()=>{
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.called');
    cy.get('@userLocation').then(fakePosition => {
      const {latitude, longitude} = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch', 
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)); // we're verifying the value passed to writeText function
        cy.get('@storeLocation').should(                                    // receives an arg that is a str that matches with the regex
          'have.been.calledWithMatch',
          /John Doe/,
          new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
        );
      })
    cy.get('@storeLocation').should('have.been.called');
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoredLocation').should('have.been.called');

    cy.get('[data-cy="info-message"]').should('be.visible'); // check the banner is visible
    cy.get('[data-cy="info-message"]').should('have.class', 'visible'); // look for the class added to the element when becomes visible.

    cy.tick(2000); // advance time by a certain amount of milliseconds. works with cy.clock
    cy.get('[data-cy="info-message"]').should('not.be.visible'); // this test will wait until certain assertion passes or fails.
  });                                                            // by default will wait for 4 seconds. test will fail if after 4 secs the element is still visible.
});

