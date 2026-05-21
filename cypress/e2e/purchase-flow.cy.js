import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';

describe('Fluxo de Compra - EBAC Shop', () => {

    let dadosProduto;
    let dadosCliente;
    let mensagens;

    beforeEach(() => {
        // 1. Limpar estado local PRIMEIRO (rápido)
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.fixture('produto').then((produto) => {
            dadosProduto = produto;
        });
        cy.fixture('cliente').then((cliente) => {
            dadosCliente = cliente;
        });
        cy.fixture('mensagens').then((msg) => {
            mensagens = msg;
            HomePage.visit();
        });
    });

    it('CT-01: Deve completar o fluxo completo de compra com validação de pedido', () => {
        // 1. Selecionar o primeiro produto
        HomePage.selecionarProdutoPorIndice(0);
        ProductPage.validarPaginaProduto();

        // 2. Selecionar tamanho e cor
        ProductPage.selecionarTamanho(dadosProduto.tamanho);
        ProductPage.selecionarCor(dadosProduto.cor);

        // 3. Comprar
        ProductPage.clicarComprar();
        ProductPage.validarProdutoAdicionado();
        ProductPage.irParaCarrinho();

        // 4. Carrinho
        CartPage.validarPaginaCarrinho();
        CartPage.validarItemNoCarrinho(dadosProduto.nomeProduto);
        CartPage.alterarQuantidade(dadosProduto.quantidade);
        CartPage.validarTotal();
        CartPage.concluirCompra();

        // 5. Checkout 
        CheckoutPage.validarPaginaCheckout();
        //CheckoutPage.validarResumoPedido(dadosProduto);
        CheckoutPage.preencherDados(dadosCliente);
        CheckoutPage.finalizarPedido();

        // 6. Confirmação - Validar pedido completo
        OrderConfirmationPage.validarPedidoConfirmado()
        OrderConfirmationPage.validarPedidoCompleto(dadosProduto);
    });

    it('CT-02: Deve validar quantidade máxima', () => {
        // 1. Selecionar o primeiro produto
        HomePage.selecionarProdutoPorIndice(0);
        ProductPage.validarPaginaProduto();

        // 2. Selecionar tamanho e cor
        ProductPage.selecionarTamanho('M');
        ProductPage.selecionarCor('White');

        // 3. Obter o valor do estoque máximo e incrementar +1 para estoque inválido
        ProductPage.obterEstoqueMaximo().then((estoqueMaximo) => {
            const estoqueInvalido = estoqueMaximo + 1;

            // 4. Inserir estoque inválido e tentar realizar compra
            ProductPage.preencherQuantidade(estoqueInvalido);
            ProductPage.clicarComprar();
            // 5. Validar mensagem de erro
            ProductPage.validarMensagemQuantidade(mensagens.quantidade.maximo);
        });
    });

    it('CT-03: Deve validar quantidade mínima', () => {
        // 1. Selecionar o primeiro produto
        HomePage.selecionarProdutoPorIndice(0);
        ProductPage.validarPaginaProduto();

        // 2. Selecionar tamanho e cor
        ProductPage.selecionarTamanho('M');
        ProductPage.selecionarCor('White');

        // 4. Validar quantidade mínima
        ProductPage.preencherQuantidade("-2");
        ProductPage.clicarComprar();

        // 5. Validar mensagem de erro
        ProductPage.validarMensagemQuantidade(mensagens.quantidade.minimo);

    });

    it('CT-04: Deve validar a não possibilidade de comprar sem tamanho e sem cor', () => {
        // 1. Selecionar o primeiro produto
        HomePage.selecionarProdutoPorIndice(0);
        ProductPage.validarPaginaProduto();

        // 2. Tentar adicionar produto sem tamanho e sem cor
        ProductPage.clicarComprar();

        // 3. Validar mensagem de erro
        cy.on('window:alert', (msg) => {
            expect(msg).to.include(mensagens.quantidade.obrigatorio);
        });

    });

    it('CT-05: Deve validar a não possibilidade de comprar sem tamanho', () => {
        // 1. Selecionar o primeiro produto
        HomePage.selecionarProdutoPorIndice(0);
        ProductPage.validarPaginaProduto();

        // 2. Selecionar cor
        ProductPage.selecionarCor('White');

        // 3. Tentar adicionar ao carrinho
        ProductPage.clicarComprar();

        // 4. Validar mensagem de erro
        cy.on('window:alert', (msg) => {
            expect(msg).to.include(mensagens.quantidade.obrigatorio);
        });

    });

    it('CT-06: Deve validar a não possibilidade de comprar sem cor', () => {
        // 1. Selecionar o primeiro produto
        HomePage.selecionarProdutoPorIndice(0);
        ProductPage.validarPaginaProduto();

        // 2. Selecionar tamanho 
        ProductPage.selecionarTamanho('M');

        // 3.  Tentar adicionar ao carrinho
        ProductPage.clicarComprar();

        // 4. Validar mensagem de erro
        cy.on('window:alert', (msg) => {
            expect(msg).to.include(mensagens.quantidade.obrigatorio);
        });

    });

});