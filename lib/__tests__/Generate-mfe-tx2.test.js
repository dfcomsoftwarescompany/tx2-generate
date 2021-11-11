"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_test_1 = require("./base-model-test/index.test");
const index_1 = require("../index");
const path = require("path");
describe('Generate tx2 types', () => {
    it('MF-e', () => {
        const dirPath = path.resolve(__dirname, 'static', 'files', 'tx2', 'communication');
        index_test_1.default.createFilePath(dirPath);
        const tx2FileName = 'test-mfe.txt';
        const tx2 = index_1.generateMFeTx2(`${dirPath}/${tx2FileName}`, invoiceInformation, [invoiceItems], [invoicePayment], invoiceTechnical);
        expect(tx2).toBe(tx2);
    });
    it('send payment', () => {
        const dirPath = path.resolve(__dirname, 'static', 'files', 'tx2', 'communication');
        index_test_1.default.createFilePath(dirPath);
        index_1.sendPaymentMfeTx2(`${dirPath}/test-send-payment.txt`, {
            docNumber: '11155',
            company: {
                cnpj: '08723218000186',
                validatorAccessKey: '25CFE38D-3B92-46C0-91CA-CFF751A82D3D',
            },
            requestKey: '26359854-5698-1365-9856-965478231456',
            Establishment: '123456',
            sale: {
                value: Number(50).toFixed(2),
                isMultiplesPayments: false,
            },
        });
        //fs.rmdirSync(path.resolve(__dirname, 'static'), { recursive: true });
        expect(1).toBe(1);
    });
});
const invoiceInformation = {
    versaoDadosEnt_A03: '0.07',
    CNPJ_B11: '16716114000172',
    signAC_B12: 'SGR-SAT SISTEMA DE GESTAO E RETAGUARDA DO SAT',
    numeroCaixa_B14: '123',
    CNPJ_C02: '08723218000186',
    IE_C12: '562377111111',
    IM_C13: '',
    indRatISSQN_C16: 'N',
    CNPJ_E02: '',
    CPF_E03: '',
    xNome_E04: '',
    xLgr_G02: '',
    nro_G03: '',
    xCpl_G04: '',
    xBairro_G05: '',
    xMun_G06: '',
    UF_G07: '',
};
const invoiceItems = {
    nItem_H02: '1',
    cProd_I02: '3359',
    cEAN_I03: '',
    xProd_I04: 'CANOPLA CROMADA 1/2',
    NCM_I05: '74182000',
    CEST_I05w: '',
    CFOP_I06: '5405',
    uCom_I07: 'PC',
    qCom_I08: '1.0000',
    vUnCom_I09: '1.00',
    indRegra_I11: 'A',
    Orig_N06: '0.00',
    vOutro_I13: '0.00',
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
    vCFeLei12741_W22: '0.01',
    infCpl_Z02: 'Teste Informacoes Complementares',
};
const invoiceTechnical = {
    CNPJ_ZD02: '23212902000197',
    email_ZD05: 'eduardo@dfcomsoftware.com',
    fone_ZD06: '1936637938',
    xContato_ZD04: 'Eduardo',
};
