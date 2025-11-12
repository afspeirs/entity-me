describe('Main Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the initial data to load with a longer timeout
    cy.get('[data-cy="table-row"]', { timeout: 10000 }).should('have.length.greaterThan', 1);
    cy.get('[data-cy="table-loading"]').should('not.exist');
  });

  it('should search for an entity', () => {
    cy.get('[data-cy="search-input"]').type('copyright');
    cy.get('[data-cy="table-body"]').contains('tr', 'copyright', { matchCase: false }).should('be.visible');
    cy.get('[data-cy="table-body"]').should('not.contain.text', 'ampersand');
  });

  it('should change category', () => {
    cy.get('[data-cy="category-select"]').click();
    cy.get('[data-cy="category-option-greekAndCoptic"] [data-cy="category-option-label"]').contains('Greek and coptic').click();
    cy.get('[data-cy="table-body"]').contains('tr', 'alpha', { matchCase: false }).should('be.visible');
  });

  it('should hide a column', () => {
    cy.get('[data-cy="table-head"]').contains('th', 'decimal').should('be.visible');
    cy.get('[data-cy="hidden-columns-button"]').click();
    cy.get('[data-cy="hidden-column-option"]').find('span').contains('decimal').click();
    cy.get('h1').click(); // Click outside to close the dropdown
    cy.get('[data-cy="table-body"]').contains('th', 'decimal').should('not.exist');
  });

  it.only('should favourite an item and see it in the favourites list', () => {
    // Search for the item first to ensure it is visible
    cy.get('[data-cy="search-input"]').type('copyright');
    cy.get('[data-cy="table-body"]').contains('tr', 'copyright', { matchCase: false }).should('be.visible');

    // Find the row with "copyright" and favourite it
    cy.contains('tr', 'COPYRIGHT SIGN', { matchCase: false }).find('[data-cy="favourite-button"]').click();

    // Clear the search
    cy.get('[data-cy="search-input"]').clear();

    // Change category to favourites
    cy.get('[data-cy="category-select"]').click();
    cy.get('[data-cy="category-option-favourites"]').contains('Favourites').click();

    // Check if the favourited item is in the list
    cy.get('[data-cy="table-row"]').should('have.length', 1);
    cy.get('[data-cy="table-body"]').contains('tr', 'copyright', { matchCase: false }).should('be.visible');
  });
});
