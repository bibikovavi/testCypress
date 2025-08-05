/// <reference types="cypress" />

describe('Тестовое задание. Несколько проверок', () => {

    beforeEach(() => {
      cy.visit('https://ds.retail-soft.pro/#/login');
    });

    it("Проверка пустых полей", () => {
      cy.get('#floatingInput').should('be.visible').and('be.empty');
      cy.get('#floatingPassword').should('be.visible').and('be.empty');
    });

    it("Проверка Невалидных данных, надписи «Ошибка входа» и красной рамки", () => {
      cy.get('#floatingInput').type('victoria@');
      cy.get('#floatingPassword').type('123456789');
      cy.get('.btn-lg.btn-primary').click();
      cy.get('[role="alert"]').should('have.css', 'background-color', 'rgb(246, 226, 225)');
    });
    
    it("Проверка нет надписи «Ошибка входа»", () => {
      // cy.reload(true);
      cy.get('.alert.alert-danger').should('not.exist');
    });
      
    it("Проверка изменения url при переходе на вхрд через Яндекс", () => {
      cy.get('a[href="/login/oauth2/ya/redirect"]')
      .should('have.attr', 'href')
      .then((href) => {
        expect(href).to.include('ya/redirect');
      });
      // cy.get('a[href="/login/oauth2/ya/redirect"]').click();
      // cy.url().should('include', 'passport.yandex.ru');
      // cy.go('back');
      //------------------------
      // cy.get('a[href="/login/oauth2/ya/redirect"]').should('be.visible').click();
      // cy.origin('https://passport.yandex.ru', () => {
      //   Cypress.on('uncaught:exception', () => false);
      //   cy.url().should('include', 'passport.yandex.ru');
      // });
      // cy.go('back');
    });

    it("Изменение языка текстовых элементов на английский язык", () => {
      cy.get('.dropdown-toggle').click();
      cy.get('.list-unstyled > :nth-child(2)').click();
      cy.clearLocalStorage();
      cy.clearCookies();
      // cy.reload(); 
      cy.get('.h4.mb-3.fw-normal', { timeout: 10000 }).should('have.text', ' Login ');
      cy.get('[for="floatingInput"]').should('have.text', 'User email');
      cy.get('[for="floatingPassword"]').should('have.text', 'Password');
      cy.get('.btn-lg.btn-primary').should('have.text', ' Enter ');
      cy.get('.mt-2.text-muted.text-sm').should('have.text', ' or login with ');
      cy.get('a[href="/login/oauth2/ya/redirect"]').should('have.text', 'Sign in with Yandex ID ');
      cy.get('a[href="/login/oauth2/vk/redirect"]').should('have.text', 'Sign in with VK ID ');
    });
  });