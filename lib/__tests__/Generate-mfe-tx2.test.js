"use strict";
// import baseModelTest from './base-model-test/index.test';
// import * as fs from 'fs';
// import { generateMFeTx2, invoceResponseMfeTx2, sendPaymentMfeTx2 } from '../index';
// import path = require('path');
// describe('Generate tx2 types', () => {
//   it('MF-e', () => {
//     const dirPath = path.resolve(__dirname, 'static', 'files', 'tx2', 'communication');
//     baseModelTest.createFilePath(dirPath);
//     const tx2FileName = 'test-mfe.txt';
//     const tx2 = generateMFeTx2(
//       `${dirPath}/${tx2FileName}`,
//       invoiceInformation,
//       [invoiceItems],
//       [invoicePayment],
//       invoiceTechnical,
//     );
//     expect(tx2).toBe(tx2);
//   });
//   it('send payment', () => {
//     const dirPath = path.resolve(__dirname, 'static', 'files', 'tx2', 'communication');
//     baseModelTest.createFilePath(dirPath);
//     sendPaymentMfeTx2(`${dirPath}/test-send-payment.txt`, {
//       docNumber: '11155',
//       company: {
//         cnpj: '08723218000186',
//         validatorAccessKey: '25CFE38D-3B92-46C0-91CA-CFF751A82D3D',
//       },
//       requestKey: '26359854-5698-1365-9856-965478231456',
//       establishment: '123456',
//       sale: {
//         value: Number(50).toFixed(2),
//         isMultiplesPayments: false,
//       },
//       creditCard: {
//         brand: undefined,
//         companyName: undefined,
//       },
//     });
//     fs.rmdirSync(path.resolve(__dirname, 'static'), { recursive: true });
//     expect(1).toBe(1);
//   });
//   it('response of invoice mfe', () => {
//     const dirPath = path.resolve(__dirname, 'static', 'files', 'tx2', 'reponse-invoice');
//     baseModelTest.createFilePath(dirPath);
//     const posDataInformation = {
//       docNumber: '63',
//       company: {
//         validatorAccessKey: '25CFE38D-3B92-46C0-91CA-CFF751A82D3D',
//         cnpj: '08723218000186',
//       },
//       idFila: '21010696',
//       requestKey: '35180508723218000186599000145370000637310995',
//       approveCodeNumber: '123456',
//       creditCard: {
//         brand: 'VISA',
//         companyName: 'ADAPTADO_SUCESSO',
//       },
//       printterStringfy: `        
// TANCA INFORMATICA EIRELI
// RUA MARECHAL FLORIANO PEIXOTO, 166,
// VILA MARCONDES, PRESIDENTE PRUDENTE
// CNPJ IE IM
// 08.723.218/0001-86 562377111111
// Extrato No.000063
// CUPOM FISCAL ELETR�?NICO - SAT
// Consumidor não informado
// # COD DESC QTD UNVL UN (VL TR VL ITEM
//   R$ R$)* R$
//   1 16 Bolinho de Bacalhau 1,000UN X 10,00
//   10,00 (0.40)
//   rateio de desconto sobre o subtotal 0.00
//   rateio de acréscimo sobre o subtotal 0.00
//   Total bruto de itens 10,00
//   Total de descontos/acréscimos 0,00
//   TOTAL R$ 10,00
//   FORMA PAGAMENTO VALOR PAGO R$
//   Cartão de Crédito 10.00
//   12345678901234567890 -
//   OBSERVA�?�?ES DO CONTRIBUINTE
//   Pedido: 70
//   Obrigado pela Preferencia Volte
// Semprewww.programaconsumer.com.br
// *Valor aproximado dos tributos
// do itemValor aproximado dos
// tributos deste cupom(conforme
//   Lei Fed.12.741/2012) R$ 0,40
//   SAT No.
//   900.014.537
//   17/05/2018 -
//   11:42:25
//   3518 0508 7232 1800 0186 5990 0014 5370 0006
//   3731 0995
//   <urlqrcode>35180508723218000186599000145370000637310995|20180517114225|10.00||RMpOVbDrDrJZByOK2obQWBvRbpzt+JJp9gSIDuloQnz3gLc2lXc2+syVL/tN26vVU7R6FylVemYIomRA2CC1Ji8W3Wmjts6cVz4or+D9TeX0TWg5HYRZyJH/34DHThM1DOA+3oaXS5OKmxJnb5lggI/fbIRjf2Je2/5WXB20y6+hwyp+XmCpknPKs5EvFnU229YHup74VwVoDGTeUlCYubd1OvoADqmij5AmIHEudbg6h+pAm47T4GlTIzlpzQl+nXwad9zSQ3zGBl85QXhzz7+3VaSsu11LtxRInfjnavE42JdEfD6tjIgM00G4abbAAY75M98KQTKCXIKxLR4EYA==</urlqrcode>]]>`,
//     };
//     invoceResponseMfeTx2(`${dirPath}/test.txt`, posDataInformation);
//     expect(1).toBe(1);
//   });
// });
// const invoiceInformation = {
//   versaoDadosEnt_A03: '0.07',
//   CNPJ_B11: '16716114000172',
//   signAC_B12: 'SGR-SAT SISTEMA DE GESTAO E RETAGUARDA DO SAT',
//   numeroCaixa_B14: '123',
//   CNPJ_C02: '08723218000186',
//   IE_C12: '562377111111',
//   IM_C13: '',
//   indRatISSQN_C16: 'N',
//   CNPJ_E02: '',
//   CPF_E03: '',
//   xNome_E04: '',
//   xLgr_G02: '',
//   nro_G03: '',
//   xCpl_G04: '',
//   xBairro_G05: '',
//   xMun_G06: '',
//   UF_G07: '',
// };
// const invoiceItems = {
//   nItem_H02: '1',
//   cProd_I02: '3359',
//   cEAN_I03: '',
//   xProd_I04: 'CANOPLA CROMADA 1/2',
//   NCM_I05: '74182000',
//   CEST_I05w: '',
//   CFOP_I06: '5405',
//   uCom_I07: 'PC',
//   qCom_I08: '1.0000',
//   vUnCom_I09: '1.00',
//   indRegra_I11: 'A',
//   Orig_N06: '0.00',
//   vOutro_I13: '0.00',
//   CSOSN_N10: '102',
//   CST_Q07: '49',
//   CST_S07: '49',
//   vItem12741_M02: '1.00',
// };
// const invoicePayment = {
//   cMP_WA03: '01',
//   vMP_WA04: '1.00',
// };
// const invoiceFooter = {
//   vCFeLei12741_W22: '0.01',
//   infCpl_Z02: 'Teste Informacoes Complementares',
// };
// const invoiceTechnical = {
//   CNPJ_ZD02: '23212902000197',
//   email_ZD05: 'eduardo@dfcomsoftware.com',
//   fone_ZD06: '1936637938',
//   xContato_ZD04: 'Eduardo',
// };
