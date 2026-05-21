class CartPage {
  visit() {
    cy.visit('/carrinho/');
  }

  validarPaginaCarrinho() {
    cy.url().should('include', '/carrinho');
  }

  validarCarrinhoNaoVazio() {
    cy.contains('Seu carrinho está vazio').should('not.be.visible');
  }


  validarItemNoCarrinho(nome) {
     cy.get('.product-name').should('be.visible')
  }

  //validar quantidade e cor?

  alterarQuantidade(quantidade) {
    cy.get('.quantity input.qty, input[name^="cart"]')
      .clear()
      .type(String(quantidade));
    cy.get('[name="update_cart"]').click({force:true});
    cy.contains('Carrinho atualizado.', { timeout: 10000 }).should('be.visible');
  }


  removerItem() {
    cy.get('.remove, a.remove').first().click();
  }


  validarTotal() {
    cy.get('.order-total .amount, .cart_totals .amount').should('be.visible');
  }


  concluirCompra() {
    cy.get('.checkout-button, .wc-proceed-to-checkout a').click();
  }

}

export default new CartPage();