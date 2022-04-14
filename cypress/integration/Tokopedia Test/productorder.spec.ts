import { faker } from '@faker-js/faker';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  context('Visiting Tokopedia and Ordering a product', () =>{
    beforeEach(function () {
      cy.clearCookies();
        cy.visit('https://www.tokopedia.com/', {timeout:150000});
      });

    it('Search and order Macbook Pro', function () {
    cy.get('[data-unify="Search"]').type('macbook pro');
    cy.get('[aria-label="Tombol pencarian"]').click();
    cy.get('[data-testid="divProductWrapper"]', {timeout:10000}).then(()=> {
        cy.get('[class="unf-coachmark__next-button css-64apm5 e1o9jid35"]').click().get('[data-testid="divProductWrapper"]').eq(2, {timeout:10000}).click()
    });
   // cy.get('[data-unify="LoaderLine"]', {timeout:10000}).should('not.be.visible');
    cy.get('[data-testid="btnProductVariantLevel1"]', {timeout:10000}).select('[data-testid="pdpVariantItemLevel#1Number#1"]');
    cy.get('[data-testid="pdpBtnNormalSecondary""]').click();
    cy.get('[data-testid="loginform"]').should('be.visible');
    //unable to proceed, need to login
    //cy.get('[data-testid="occBtnPayment"]').click();
    })
})