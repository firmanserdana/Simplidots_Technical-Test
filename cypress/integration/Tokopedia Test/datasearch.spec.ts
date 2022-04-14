import { faker } from '@faker-js/faker';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  context('Visiting Tokopedia and Searching for a Product Data', () =>{
    beforeEach(function () {
      cy.clearCookies();
        cy.visit('https://www.tokopedia.com/', {timeout:150000});
      });

    it('Search and log Macbook Pro Data Search', function () {
    cy.get('[data-unify="Search"]').type('macbook pro');
    cy.get('[aria-label="Tombol pencarian"]').click();
    cy.intercept('POST', 'https://gql.tokopedia.com/graphql/SearchProductQueryV4').as('searchresult');
    cy.wait('@searchresult', {timeout:30000}).then((req) => {
        cy.log(req.response.body);
        cy.writeFile('data/search/result.json', req.response.body[0].data.ace_search_product_v4.data.products);
      });
    })

    it('Search Using Random Words', function () {
      cy.get('[data-unify="Search"]').type(faker.random.alphaNumeric(10));
      cy.get('[aria-label="Tombol pencarian"]').click();
      cy.contains('Oops, produk nggak ditemukan', {timeout:10000}).should('be.visible');
      cy.get('[data-testid="btnSRPChangeKeyword"]', {timeout:10000}).should('be.visible');
      })
 
      it('Retailer Search', function () {
        cy.get('[data-unify="Search"]').type('Buku');
        cy.get('[data-testid="lnkHeaderAutocomTopDigi"]').eq(0).click();
        cy.url().should('contain', 'https://www.tokopedia.com/p/buku');
        cy.get('[data-testid="imgCL1arsitektur-desain"]', {timeout:10000}).should('be.visible');
        cy.get('[data-testid="imgCL1buku-hukum"]', {timeout:10000}).should('be.visible');
        
        })
})