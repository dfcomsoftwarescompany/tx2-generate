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
  CNPJ_B11: '16716114000172',
  signAC_B12: 'SGR-SAT SISTEMA DE GESTAO E RETAGUARDA DO SAT',
  numeroCaixa_B14: '123',
  CNPJ_C02: '08723218000186',
  IE_C12: '562377111111',
  indRatISSQN_C16: 'N',
};

const invoiceItems = {
  nItem_H02: '1',
  cProd_I02: '3359',
  xProd_I04: 'CANOPLA CROMADA 1/2',
  NCM_I05: '74182000',
  CFOP_I06: '5405',
  uCom_I07: 'PC',
  qCom_I08: '1.0000',
  vUnCom_I09: '1.00',
  indRegra_I11: 'A',
  Orig_N06: '0',
  CSOSN_N10: '102',
  CST_Q07: '49',
  CST_S07: '49',
  vItem12741_M02: '1.00',
};

const invoicePayment = {
  cMP_WA03: '01',
  vMP_WA04: '1.00',
};

const invoiceFooter = {
  vCFeLei12741_W22: 0.01,
  infCpl_Z02: 'Teste Informacoes Complementares',
};

const invoiceTechnical = {
  CNPJ_ZD02: '23212902000197',
  email_ZD05: 'eduardo@dfcomsoftware.com',
  fone_ZD06: '1936637938',
  xContato_ZD04: 'Eduardo',
};
