class CheckoutPage {
  /**
   * Valida que está na página de checkout
   */
  validarPaginaCheckout() {
    cy.get('h1.page-title').should('contain.text', 'Checkout');
  }

  /**
   * Preenche os dados de checkout
   */
  preencherDados(cliente) {
    cy.get('input[name="billing_first_name"]').type(cliente.firstName);
    cy.get('input[name="billing_last_name"]').type(cliente.lastName);
    cy.get('input[name="billing_address_1"]').type(cliente.address);
    cy.get('input[name="billing_city"]').type(cliente.city);
    cy.get('input[name="billing_postcode"]').type(cliente.postcode);
    //cy.get('select[name="billing_state"]').select(cliente.state);
    cy.get('input[name="billing_phone"]').type(cliente.phone);
    cy.get('input[name="billing_email"]').type(cliente.email);
  }

  /**
   * Finaliza o pedido
   */
  finalizarPedido() {
    cy.get('[name="terms"]')
      .click();
    cy.get('[name="woocommerce_checkout_place_order"]')
      .click()
  }
  
}

export default new CheckoutPage();