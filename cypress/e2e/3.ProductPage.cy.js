describe('API testing on product page', () => {
    const product_api_url = 'https://fakestoreapi.com/products';
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            cy.session([users.correct_login.email, users.correct_login.password], () => {
                cy.login(users.correct_login.email, users.correct_login.password);
                cy.url().should('include', '/dashboard'); // confirm login worked
            });
        });
        cy.visit('/products');
    });

    it('Verify the APIs on product page', function () {
        cy.intercept('GET', product_api_url).as('getProducts');
        // Verify the loading indicator appears while fetching
        cy.dataCy('loading-indicator').should('exist');
        cy.wait('@getProducts');
        cy.dataCy('loading-indicator').should('not.exist');
        // Verify the products load and display correctly after API response
        cy.get('[data-testid^="product-image"]').should('have.length.gt', 0).and('be.visible');
    });

    it('Verify the search functionality works on fetched data', function () {
        cy.dataCy('product-1').find('h3').invoke('text').then((productName) => {
            const name = productName.trim();
            cy.dataCy('search-input').type(name + '{enter}');
            cy.get('[data-testid^="product-"]', { timeout: 10000 }).should('exist');
            // Verify the displayed product should include the searched product name
            cy.get('[data-testid^="product-"]:has(h3)').each(($product) => {
                cy.wrap($product).find('h3').invoke('text').then((productText) => {
                    expect(productText.toLowerCase()).to.include(name.toLowerCase());
                });
            });
        });
    });

    it('Verify the filter dropdown', function () {
        const categories = [
            { name: 'All Products', value: "all" },
            { name: 'Electronics', value: 'electronics' },
            { name: 'Jewelery', value: 'jewelery' },
            { name: "Men's Clothing", value: "men's clothing" },
            { name: "Women's Clothing", value: "women's clothing" }
        ];
        const allCategoryValues = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
        categories.forEach(category => {
            cy.dataCy('filter-select').select(category.name).should('have.value', category.value);
            if (category.value === 'all') {
                cy.get('.product-card').each(($el) => {
                    cy.wrap($el).invoke('text').should('satisfy', (text) => {
                        return allCategoryValues.some(cat => text.includes(`Category: ${cat}`));
                    });
                });
            }
            else {
                cy.get('.product-card').each(($el) => {
                    cy.wrap($el).invoke('text').should('include', `Category: ${category.value}`);
                });
            }
        });
    });

    it('Verify an error handling when API fails (mock a failed API response)', function () {
        // Mock the API to fail
        cy.intercept('GET', product_api_url, {
            statusCode: 500,
            body: {
                error: 'Internal Server Error',
                message: 'Unable to fetch the products from server'
            }
        }).as('failedAPI');
        cy.visit('/products');
        cy.wait('@failedAPI');
        cy.contains('Error: Failed to fetch products: 500').should('be.visible');
        // Mock the API with data
        cy.intercept('GET', product_api_url, {
            statusCode: 200,
            body:
                [{
                    "id": 1,
                    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    "price": 109.95,
                    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                    "rating": {
                        "rate": 3.9,
                        "count": 120
                    }
                }
                ]
        }).as('productSuccessAPI');
        cy.reload();
        cy.wait('@productSuccessAPI');
        cy.get('.product-card').should('have.length', 1);
        cy.contains('Fjallraven - Foldsack No. 1 Backpack').should('be.visible');
    });
});