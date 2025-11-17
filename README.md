# Cypress-ShopTalk-Aravind
# Cypress Interview Assessment - ShopTalk

- This project demonstrates end-to-end (E2E) and API testing for the ShopTalk application, using Cypress for browser automation.
- Each test scripts fulfills a real-world scenarios by covering navigation, authentication, API integration, protected routes, pagination, error handling, and form validation.

### Overview
 This Cypress test suite includes well-structured tests for:
 
- Navigation and Basic Page Verification
- Login Form Validation and Authentication
- API Testing - Products Page
- API Testing - Users Page with Pagination
- Protected Routes and Error Handling
- Contact Form Testing
- Posts Page with Nested API Calls

### prerequisite

1. Node.js must be installed. If not, download and install it from https://nodejs.org/en/download
2. An IDE or code editor such as Visual Studio Code, JetBrains WebStorm, or Eclipse.

### Setup & Installation

1. **Clone the repository:**
	git clone
	cd
	**Download / extract the folder:**
	Download the folder and files provided via Email
	Open terminal in the project directory
	
2. **Install dependencies:**
	npm install
	

### configuration

1. Cypress config is found in *cypress.config.js*
	1. baseUrl - for centralized base url setup for all tests.
	2. screenshotOnRunFailure: true - enables automatic screenshot capture on failure.

2. Fixtures such as *users.json* provide test data for various login scenarios.

3. Defined in *cypress/support/commands.js* for reusable actions (e.g., login, selector shortcuts).

4. Page objects located in *cypress/support/page-objects/* to promote reusable, maintainable test logic (e.g., contact form submission).

## How to run tests

1. **Run all tests in headless mode:**
	npm run tests
2. **Run a specific spec:**
	npx cypress run --spec "cypress/e2e/1.NavigationVerifications.cy.js"
3. **Run Cypress in locally:**
	npx cypress open

## Custom Commands & Page Objects
1. Custom command *cy.dataCy()* is used for fast and clean element selection.
2. Custom command *cy.login(email, password)* for reusable authentication helper for login tests
3. ContactPage object abstracts form interactions for maintainable and readable tests.

## Notes
1. Implemented *cy.session()* feature for session caching to optimize test runs and prevent redundant logins.
2. Screenshots and videos of failures are automatically stored for debugging.
3. Added a *"tests" : npx cypress run* in the *package.json* file to quickly execute tests using *npm run tests*

## To be Implemented in real project
1. Use *Yarn* package manager 
Yarn generally offers faster performance than npm because it installs packages in parallel and efficiently caches dependencies.
Also, we can use the following command to execute the tests sequentially, as some tests may depend on previous ones. This approach is helpful because Cypress does not guarantee that tests will run in order by default:
**yarn run tests --spec $(find cypress/e2e -name '*.cy.js' | sort)**
This command finds all test spec files in the cypress/e2e directory, sorts them alphabetically, and runs them in that sequence to maintain order.
I am not implementing this now because the *find* command works on linux/mac, but i am currently testing this application on Windows. However, I have used this approach successfully in a previous project.
		
