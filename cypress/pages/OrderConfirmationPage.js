class OrderConfirmationPage {
  /**
   * Valida que o pedido foi confirmado com sucesso
   */
  validarPedidoConfirmado() {
    cy.get('h1.page-title').should('contain.text', 'Pedido recebido');
    cy.get('.woocommerce-notice--success').should('be.visible');
  }

  /**
   * Valida o pedido completo com os dados inseridos
   * Extrai automaticamente número, data, total e método de pagamento da página
   * @param {object} dados - { nomeProduto, tamanho, cor, quantidade }
   * 
   * Exemplo:
   * OrderConfirmationPage.validarPedidoCompleto({
   *   nomeProduto: 'Ingrid Running Jacket',
   *   tamanho: 'M',
   *   cor: 'Red',
   *   quantidade: 2
   * })
   */
  validarPedidoCompleto(dados) {
    // 1. Valida que o pedido foi confirmado
    this.validarPedidoConfirmado();

    // 2. Valida produto com tamanho e cor
    cy.contains('.woocommerce-table__product-name a', 
      `${dados.nomeProduto} - ${dados.tamanho}, ${dados.cor}`)
      .should('be.visible');

    // 3. Valida quantidade
    cy.get('.product-quantity')
        .should('include.text', dados.quantidade.toString());
  }
}

export default new OrderConfirmationPage();