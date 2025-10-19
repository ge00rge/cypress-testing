This repo consists of 6 small projects where cypress testing is performed. 

I cover from the most simple stuff in the first project to the most advance stuff in the last project.

Some notes below:

Cypress is a JavaScript automation tool and framework designed to facilitate modern web testing.

It ensures test isolation, meaning different tests are independent, even if they belong to the same file or suite.

`npx cypress open` Opens the Cypress Studio GUI.

`npx cypress run` Executes tests in headless mode (behind the scenes).

`npx cypress run --browser firefox` Executes tests in a specific browser.

**cypress open vs. cypress run**

Sometimes, tests pass in cypress open but fail in cypress run. This often happens when elements cannot be successfully selected in headless mode.
Solution: Use unique selectors (e.g., specific attributes like [data-cy="..."]) and consider alternative ways of writing assertions or selecting elements.
Best Practice: Always use the .should() command over .then() for assertions, as it is generally more stable and handles retries.

Always include the following line at the top of your test files for Cypress autocompletion:
`/// <reference types="Cypress" />`


After opening the Cypress app for the first time, a new cypress folder is created in your directory, including:

- **e2e folder**: Where test files (e.g., *.cy.js) are saved.

- **support folder**: Used for defining Custom Commands and Queries.

- **Specs**: The "Specs" button in the sidebar allows you to switch between testing files.


**Configuration** (`cypress.config.js`):

Global configuration is in cypress.config.js.

You can set a baseUrl so that cy.visit() automatically uses a default URL.

Local Configuration: Config options (like which browser to run in) can be passed as the second parameter to describe() or it() functions.

**Test Structure**

cy object: The entry point to all Cypress commands, defining executable steps.

**Suites and Tests:**

**describe**(description, callback): Creates a test suite (collection of tests).

**it**(description, callback): Creates a single test.


**Hooks**

Hooks are functions executed at specific times around your tests

- `beforeEach()`	Runs before every test in the suite.	

- `before()`	Runs once before the entire suite starts.	

- `afterEach()`	Runs after every test.	Not recommended for cleanup; use before hooks instead.

- `after()`	Runs once after the entire suite finishes.	


**cypress commands:**

Notes from: https://docs.cypress.io/api/table-of-contents

**visit**: run at beggining of all your tests. 
		   allows you to visit different website pages.

**get**: used to find elements on the page.
		1st param: any css selector (by tag , className, attribute)
				   ex: cy.get('img') will find all images on the page.
	    		   cypress recommends using specific-attribute when reaching out to elements (because of their uniqueness)
	    		   ex: `cy.get('[data-cy="header-about-link"]').click()`

**contains**: allow us to look for a certain text.
			 also yields the elements that contain a specific text.
			 allow us to look for partial text.

**should**: specifies explicit assertions.
		   
the number of arguments passed depends on the first argument which is the assertion.
    Ex: s`hould('have.length', 1)` vs `should('exist')` won't need a second arg.

doc for assertions: https://docs.cypress.io/guides/references/assertions

we can use an alternative syntax when using should that can help us avoid:
 - chaining shoulds
 - understanding when chaining shoulds which should yields what value to the next.

alternative syntax:
`.should((el)=> {
expect(el.attr('class')).contains('invalid')
})`
instead of: `.should('have.attr', 'class').and('match', /invalid/);`

Typically, multiple chained should all refer to the original subject, for example to the original element. But if you are, for example using should to check for a specific attribute, like the class attribute, a chained should thereafter would receive the value of that attribute

**and**: alias for 'should'
        make overall sentence more readable
        purely stylistic readability thing

**find**: finds all the elements that were found by the previous 'get'

**click**: chained command that simulate action of clicking something.
		  click can recieve a config object. 
		  ex: .click({force: true}) this will force cypress to click a specific element class.

**type**: chained command that simulate action of typing something.
		 Types specific text after a get method.

**select**: chained command that simulate action of selecting something.
		   Selects an element from a dropdown.

**first**: chained command. First element from a list of el.

**last**: chained command.
		 first element from a list of el.

**eq**: get a specific element selected by index.

**location**: allows us to get information on where we are currently in a website.

**go**: simulate clicking back or forward button.

**as**: chained command.
	   alias that can later be used in a get method with cy.get('@<alias>')
	   better to use this than constants.
	   aliases can be assigned to all kinds of data, not only dom elements.

**then**: enables you to work with the subject yielded from the previous command.
         alternative way of writing tests to traditional cypress approach.
	     gives you more access to the different properties the DOM element might have. 
	     allows to manipulate an element as part of the test, check if a specific class is set, check the value of an attribute
	     'should' doesn't exist as assertion, for inside the el, we use expect()
	     https://docs.cypress.io/guides/references/assertions
	     avoid when necessary.

**blur**: check if a specific element has gained focus.
		 
**parent**: chained command.
		   get the parent element.

**children**: chained command.
		     get the children element.

**focus**: chained command.
		  force to focus an element.

**screenshot**: create screenshot at a given point in the code when we run npx cypress run.

**now**: allows execute cypress method instantly instead of creating instruction that is queued.
		use only if we define custom queries so that test don't fail while running in headless mode.

**task**: we trigger an event that should be runned outside of the browser (defined in the cypress.config.js)
		 we can trigger the event from the cypress test any moment during the test run.
		 as param we pass the name of the task you want to execute.
		 we can chain then() to the task() to do something with the retrieved value

**stub**: replace existing function by another one defined by us.

**callsFake**: chained to stub.
			  pass a callback function as arg that will be used instead of the empty stubbed implementation.

**resolves**: to make sure that our stub returns a promise

**fixture**: to access fixture data.
			as param we pass name of file inside the fixtures folder.
			follow by 'as' to set an alias and then call it wherever needed.

**clock**: tell cypress we want to manipulate timers.

**tick**: allows you to advance time by a certain amount of milliseconds.
         tick works with clock.

**intercept**: intercepts http requests.
			  VIP -> sets up interceptor that watchs for certain kinds of http requests, block the HTTP request and return some dummy response instead of actually hitting the backend.
			  as params we pass: 1-type of request
			  					 2-request the frontend performs to the api
			  					 3-dummy response that should be returned by the request.

**wait**: goes with intercept.
 		 as param will receive the alias we used for the intercept
 		 its function is to wait for the request to be sent and intercepted.
 		 the next instruction will only be executed by Cypress after it observed this HTTP request and after it blocked and stubbed this http request.
 		 this check only is executed after the HTTP request was sent.
 		 wait for the intercept to be detected

**request**: used to make HTTP requests within your Cypress test scripts
 			 allows you to interact with web APIs, send HTTP requests, and receive responses for testing purposes

**cookie**: check for a cookie in the browser.
 			pass as param the name of the cookie.

**its**: chained method.
 	     to look to the individual propertes of an object (ex: cookie).
 	     as param , we specify the property.


**Stubbing, Spying, and Fixtures**

**Stubs**: Replace existing functions with hardcoded implementations to return a predefined value.	

**Spies**: Attach listeners to existing functions to determine if, and how, they were called.	

**Fixtures**: Fixed, shared dummy data stored in files (usually in the fixtures folder) that can be used across tests.


**Debugging and Screenshots**

- **cy.screenshot()**: Creates a screenshot at a given point when running npx cypress run.

- Debugging Tip: Use the browser's developer tools (inspector) and the Cypress Test Runner's command log.

**Custom Commands**

- Defined in the support/commands.js file.

- Used to avoid repeating commands and simplify complex sequences (e.g., a login flow).

**Note**: Custom queries may fail when running tests in headless mode.


**Important Testing Principles**

- Test Your Application, Not 3rd Party APIs/Libraries: Use cy.intercept() or stubs to control external dependencies.

- Use unique selectors like [data-cy="..."]. Chaining cy.get() after cy.get() is discouraged as it resets the search to the entire page; use .find() instead for nested elements.

- Cypress has a default 4-second timeframe (timeout) to check if an expectation is met. This automatic retry mechanism is key to handling asynchronous UIs. Be aware of this when writing assertions, especially if an element's state changes quickly.


