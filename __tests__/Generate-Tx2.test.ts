import * as fs from 'fs';
import { generateMFeTx2 } from '../src/index';
import * as randomstring from 'randomstring';

describe('Generate tx2 types', () => {
  it('MF-e', () => {
    if (!fs.existsSync('__test__/files/mfe/tx2')) fs.mkdirSync('__test__/files/mfe/tx2', { recursive: true });

    const tx2FileName = 'test.tx2';

    const tx2 = generateMFeTx2(
      `__test__/files/mfe/tx2/${tx2FileName}`,
      invoiceInformation,
      [invoiceItems],
      [invoicePayment],
      invoiceTechnical,
    );

    expect(tx2).toBe(tx2);
  });
});

const invoiceInformation = {
  versaoDadosEnt_A03: '0.07',
  CNPJ_B11: '16716114000172', //CNPJ Software House
  signAC_B12: 'SGR-SAT SISTEMA DE GESTAO E RETAGUARDA DO SAT', //Assinatura do Aplicativo Comercial
  numeroCaixa_B14: '123', //Número do Caixa ao qual o SAT está conectado
  CNPJ_C02: '08723218000186', //CNPJ do emitente
  IE_C12: '562377111111', //Inscrição Estadual
  IM_C13: '', // Inscrição Municipal
  indRatISSQN_C16: 'N', //Indicador de rateio do Desconto sobre subtotal entre itens sujeitos à tributação pelo ISSQN
  CNPJ_E02: '', //CNPJ do destinatário
  CPF_E03: '', // CPF do destinatário
  xNome_E04: '', //Razão social ou nome do destinatário
  xLgr_G02: '', //Logradouro
  nro_G03: '',
  xCpl_G04: '',
  xBairro_G05: '',
  xMun_G06: '',
  UF_G07: '',
};

const invoiceItems = {
  nItem_H02: '1', // Número do Item
  cProd_I02: '3359', // Código do produto ou serviço
  cEAN_I03: '', // GTIN (Global Trade Item Number) do produto, antigo código EAN ou código de barras
  xProd_I04: 'CANOPLA CROMADA 1/2', //Descrição do produto ou serviço
  NCM_I05: '74182000', // Código NCM com 8 digitos ou 2 dígitos (gênero)
  CEST_I05w: '', // Código Especificador da Substituição Tributária
  CFOP_I06: '5405', //  	Código Fiscal de Operações e Prestações
  uCom_I07: 'PC', // Unidade Comercial
  qCom_I08: '1.0000', //  	Quantidade Comercial
  vUnCom_I09: '1.00', //  	Valor Unitário de Comercialização
  indRegra_I11: 'A', // Regra de cálculo
  Orig_N06: '0.00', // Valor Total do Desconto
  vOutro_I13: '0.00', // Outras despesas
  CSOSN_N10: '102', // Código de Situação da Operação – Simples Nacional
  CST_Q07: '49', // Código de Situação Tributária do PIS
  CST_S07: '49', // Código de Situação Tributária do COFINS
  vItem12741_M02: '1.00', //  	Valor aproximado dos tributos do Produto ou serviço.
};

const invoicePayment = {
  cMP_WA03: '01', // Código do Meio de Pagamento empregado para quitação do CF-e
  vMP_WA04: '1.00', // Valor do Meio de Pagamento empregado para quitação do CF-e
};

const invoiceFooter = {
  vCFeLei12741_W22: '0.01', // Valor aproximado dos tributos do CFe-SAT – Lei 12741/12.
  infCpl_Z02: 'Teste Informacoes Complementares', // Informações Complementares de interesse do Contribuinte
};

const invoiceTechnical = {
  CNPJ_ZD02: '23212902000197',
  email_ZD05: 'eduardo@dfcomsoftware.com',
  fone_ZD06: '1936637938',
  xContato_ZD04: 'Eduardo',
};
