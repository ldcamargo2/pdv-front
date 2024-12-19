const escpos = require('escpos');
const express = require('express');
const bodyParser = require('body-parser');

// Suporte para UTF-8
escpos.USB = require('escpos-usb');

// Configurar conexão com a impressora
const device = new escpos.USB();
const printer = new escpos.Printer(device, { encoding: 'GB18030' }); // Suporte a caracteres especiais

// Função para formatar valores em reais
const formatarReais = (valor) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

// Função para imprimir o cupom
const imprimirCupom = (dados) => {
  const { empresa, cliente, produtos } = dados;

  const total = produtos.reduce((acc, item) => acc + item.quantidade * item.preco, 0);

  device.open(() => {
    printer
      .align("CT")
      .style("B")
      .size(1, 1)
      .text(empresa.nome)
      .size(0, 0)
      .text(empresa.endereco)
      .text(`${empresa.cidade}`)
      .text(`Tel: ${empresa.telefone}`)
      .text(`CNPJ: ${empresa.cnpj} IE: ${empresa.ie}`)
      .drawLine()
      .align("LT")
      .text(`Cliente: ${cliente.nome}`)
      .text(`CPF: ${cliente.cpf}`)
      .drawLine()
      .text("Descrição                Qtde   Preço   Total")
      .drawLine();

    produtos.forEach((item) => {
      const totalItem = item.quantidade * item.preco;
      printer.text(
        `${item.descricao.padEnd(20)} ${String(item.quantidade).padStart(4)}   ${formatarReais(
          item.preco
        ).padStart(6)}   ${formatarReais(totalItem).padStart(6)}`
      );
    });

    printer
      .drawLine()
      .align("RT")
      .text(`Total: ${formatarReais(total)}`)
      .align("CT")
      .drawLine()
      .text("Obrigado pela preferência!")
      .text("Volte sempre!")
      .cut()
      .close();
  });
};

// Criar servidor Express
const app = express();
app.use(bodyParser.json());

// Rota para imprimir
app.post('/imprimir', (req, res) => {
  const dados = req.body;

  if (!dados || !dados.empresa || !dados.cliente || !dados.produtos) {
    return res.status(400).send({ error: 'Dados incompletos para impressão.' });
  }

  try {
    imprimirCupom(dados);
    res.send({ message: 'Cupom enviado para impressão.' });
  } catch (error) {
    console.error('Erro ao imprimir:', error);
    res.status(500).send({ error: 'Erro ao imprimir o cupom.' });
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
