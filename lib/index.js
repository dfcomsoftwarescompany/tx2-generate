"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoceResponseMfeTx2 = exports.verifyStatusMfeTx2 = exports.sendPaymentMfeTx2 = exports.generateMFeTx2 = exports.generateNFeTx2 = exports.cancelNFCe = exports.generateNFCeTx2 = exports.generatecNF_B03 = exports.print = exports.sendNFe = exports.sendNFCe = void 0;
const querystring = require("querystring");
const fs = require("fs");
const request = require("request");
const createHeader = (caminhoTx2) => {
    return new Promise((resolve) => {
        fs.appendFileSync(caminhoTx2, 'formato=tx2\nnumlote=0');
        resolve('Cabeçalho criado com sucesso!');
    });
};
const createDadosNota = (caminhoTx2, dadosNota) => {
    return new Promise((resolve) => {
        //  Cabeçalho dos dados da nota.
        fs.appendFileSync(caminhoTx2, '\nINCLUIR');
        const keys = Object.keys(dadosNota);
        keys.forEach((key) => {
            fs.appendFileSync(caminhoTx2, `\n${key}=${dadosNota[key]}`);
        });
        resolve('Dados da nota criados com sucesso.');
    });
};
const createDadosEmitente = (caminhoTx2, dadosEmitente) => {
    return new Promise((resolve) => {
        const keys = Object.keys(dadosEmitente);
        keys.forEach((key) => {
            fs.appendFileSync(caminhoTx2, `\n${key}=${dadosEmitente[key]}`);
        });
        resolve('Dados do emitente criados com sucesso.');
    });
};
const createDadosDestinatario = (caminhoTx2, dadosDestinatario) => {
    return new Promise((resolve) => {
        const keys = Object.keys(dadosDestinatario);
        keys.forEach((key) => {
            fs.appendFileSync(caminhoTx2, `\n${key}=${dadosDestinatario[key]}`);
        });
        resolve('Dados do emitente criados com sucesso.');
    });
};
const createDadosItens = (caminhoTx2, itens) => {
    return new Promise((resolve) => {
        //  Cabeçalho dos dados da nota.
        itens.forEach((item) => {
            fs.appendFileSync(caminhoTx2, '\nINCLUIRITEM');
            const keys = Object.keys(item);
            keys.forEach((key) => {
                fs.appendFileSync(caminhoTx2, `\n${key}=${item[key]}`);
            });
            fs.appendFileSync(caminhoTx2, '\nSALVARITEM');
            resolve('Dados dos itens criados com sucesso.');
        });
    });
};
const createPagamentos = (caminhoTx2, pagamentos, type) => {
    return new Promise((resolve) => {
        pagamentos.forEach((pagamento) => {
            //  Cabeçalho dos dados da nota.
            fs.appendFileSync(caminhoTx2, '\nINCLUIRPARTE=' + type);
            const keys = Object.keys(pagamento);
            keys.forEach((key) => {
                fs.appendFileSync(caminhoTx2, `\n${key}=${pagamento[key]}`);
            });
            fs.appendFileSync(caminhoTx2, '\nSALVARPARTE=' + type);
            resolve('Dados do pagamento criados com sucesso.');
        });
    });
};
const createTotalizadores = (caminhoTx2, totalizadores) => {
    return new Promise((resolve) => {
        // Cabeçalho dos dados da nota.
        const keys = Object.keys(totalizadores);
        keys.forEach((key) => {
            fs.appendFileSync(caminhoTx2, `\n${key}=${totalizadores[key]}`);
        });
        resolve('Dados do pagamento criados com sucesso.');
    });
};
const createAuthGetXml = (caminhoTx2, cnpj = '', cpf = '') => {
    return new Promise((resolve) => {
        if (cnpj || cpf)
            fs.appendFileSync(caminhoTx2, `\nINCLUIRPARTE=AUTXML\n${cnpj && `CNPJ_GA02=${cnpj}\n`}${cpf && `CPF_GA03=${cpf}\n`}SALVARPARTE=AUTXML`);
        resolve('Dados do pagamento criados com sucesso.');
    });
};
const createTecnico = (caminhoTx2, tecnico) => {
    return new Promise((resolve) => {
        // Cabeçalho dos dados da nota.
        const keys = Object.keys(tecnico);
        keys.forEach((key) => {
            fs.appendFileSync(caminhoTx2, `\n${key}=${tecnico[key]}`);
        });
        fs.appendFileSync(caminhoTx2, '\n\nSALVAR');
        resolve('Dados do pagamento criados com sucesso.');
    });
};
/**
 * Envia o arquivo tx2 para a api da tecnospeed e retorna a resposta.
 * @param tx2Path o caminho para o arquivo tx2
 * @param cnpj o cnpj da empresa emitente
 * @param grupo o nome do grupo
 * @param authorization a string de autorização para acessar a api da tecnospeed.
 */
const sendNFCe = (tx2Path, cnpj, grupo, authorization, port, amb) => {
    return new Promise((resolve, reject) => {
        const form = {
            CNPJ: cnpj,
            Grupo: grupo,
            Arquivo: fs.readFileSync(tx2Path, 'utf-8'),
        };
        const formData = querystring.stringify(form);
        const contentLength = formData.length;
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': contentLength,
                Authorization: authorization,
            },
            url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfce/envia`,
            method: 'POST',
            body: formData,
        }, (err, resp, body) => {
            if (err)
                reject(err);
            else {
                resolve(body);
            }
        });
    });
};
exports.sendNFCe = sendNFCe;
/**
 * Envia o arquivo tx2 para a api da tecnospeed e retorna a resposta.
 * @param tx2Path o caminho para o arquivo tx2
 * @param cnpj o cnpj da empresa emitente
 * @param grupo o nome do grupo
 * @param authorization a string de autorização para acessar a api da tecnospeed.
 */
const sendNFe = (tx2Path, cnpj, grupo, authorization, port, amb) => {
    return new Promise((resolve, reject) => {
        const form = {
            CNPJ: cnpj,
            Grupo: grupo,
            Arquivo: fs.readFileSync(tx2Path, 'utf-8'),
        };
        const formData = querystring.stringify(form);
        const contentLength = formData.length;
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': contentLength,
                Authorization: authorization,
            },
            url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfe/envia`,
            method: 'POST',
            body: formData,
        }, (err, resp, body) => {
            if (err)
                reject(err);
            else {
                resolve(body);
            }
        });
    });
};
exports.sendNFe = sendNFe;
/**
 * Gera o conteúdo para impressão da nota fiscal.
 * @param authorization a string de autorização para acessar a api da tecnospeed
 * @param key a chave da nota
 * @param url 0 = conteúdo binário de pdf, 1 = url para download do pdf.
 * @param group nome do grupo
 * @param cnpj cnpj da empresa emitente.
 */
const print = (authorization, key, url, group, cnpj, port, amb) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const form = {
            ChaveNota: key,
            CNPJ: cnpj,
            Grupo: group,
            Url: url,
        };
        request({
            headers: {
                Authorization: authorization,
            },
            url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfce/imprime`,
            method: 'GET',
            qs: form,
        }, (err, resp, body) => {
            if (err)
                reject(err);
            else {
                resolve(body);
            }
        });
    });
});
exports.print = print;
/**
 * Generates a random string to complement the cNF_B03 value.
 */
const generatecNF_B03 = () => {
    return new Promise((resolve, reject) => {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        resolve(result);
    });
};
exports.generatecNF_B03 = generatecNF_B03;
/**
 * Gera o arquivo tx2 (para NFCe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param dadosNota um objeto contendo os dados iniciais da nota.
 * @param dadosEmitente um objeto contento os dados do emitente.
 * @param itens um array contendo objetos com os dados dos itens.
 * @param pagamentos um array contendo as informações das formas de pagamento utilizadas.
 * @param totalizadores um objeto contendo os dados dos totalizadores.
 * @param tecnico um objeto contendo as informações do responsável técnico.
 * @param cnpjAutorizado Autorização para obter XML
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
const generateNFCeTx2 = (caminhoTx2, dadosNota, dadosEmitente, itens, pagamentos, totalizadores, tecnico, cnpjAutorizado, cpfAutorizado) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (fs.existsSync(caminhoTx2)) {
            reject('Já existe um tx2 no caminho especificado.');
        }
        else {
            yield createHeader(caminhoTx2);
            yield createDadosNota(caminhoTx2, dadosNota);
            yield createDadosEmitente(caminhoTx2, dadosEmitente);
            yield createDadosItens(caminhoTx2, itens);
            yield createAuthGetXml(caminhoTx2, cnpjAutorizado, cpfAutorizado);
            yield createPagamentos(caminhoTx2, pagamentos, 'YA');
            yield createTotalizadores(caminhoTx2, totalizadores);
            yield createTecnico(caminhoTx2, tecnico);
            resolve(caminhoTx2);
        }
    }));
};
exports.generateNFCeTx2 = generateNFCeTx2;
/**
 * Cancela uma NFCe.
 * @param authorization the header authrization string (base 64).
 * @param group the group name
 * @param cnpj the company cnpj
 * @param nfceKey the nfce key
 * @param justify a string justifying the cancel reason
 * @returns
 */
const cancelNFCe = (authorization, group, cnpj, nfceKey, justify, port, amb) => {
    return new Promise((resolve, reject) => {
        try {
            const form = {
                ChaveNota: nfceKey,
                CNPJ: cnpj,
                Grupo: group,
                Justificativa: justify,
            };
            request({
                headers: {
                    Authorization: authorization,
                },
                url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfce/cancela`,
                method: 'POST',
                qs: form,
            }, (err, resp, body) => {
                if (err)
                    reject(err);
                else {
                    resolve(body);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.cancelNFCe = cancelNFCe;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param dadosNota um objeto contendo os dados iniciais da nota.
 * @param dadosEmitente um objeto contento os dados do emitente.
 * @param dadosDestinatario um objeto contendo os dados do destinatário.
 * @param itens um array contendo objetos com os dados dos itens.
 * @param pagamentos um array contendo as informações das formas de pagamento utilizadas.
 * @param totalizadores um objeto contendo os dados dos totalizadores.
 * @param tecnico um objeto contendo as informações do responsável técnico.
 * @param cnpjAutorizado Autorização para obter XML
 * @param cpfAutorizado Autorização para obter XML
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
const generateNFeTx2 = (caminhoTx2, dadosNota, dadosEmitente, dadosDestinatario, itens, pagamentos, totalizadores, tecnico, cnpjAutorizado, cpfAutorizado) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (fs.existsSync(caminhoTx2)) {
            reject('Já existe um tx2 no caminho especificado.');
        }
        else {
            yield createHeader(caminhoTx2);
            yield createDadosNota(caminhoTx2, dadosNota);
            yield createDadosEmitente(caminhoTx2, dadosEmitente);
            yield createDadosDestinatario(caminhoTx2, dadosDestinatario);
            yield createAuthGetXml(caminhoTx2, cnpjAutorizado, cpfAutorizado);
            yield createDadosItens(caminhoTx2, itens);
            yield createPagamentos(caminhoTx2, pagamentos, 'YA');
            yield createTotalizadores(caminhoTx2, totalizadores);
            yield createTecnico(caminhoTx2, tecnico);
            resolve(caminhoTx2);
        }
    }));
};
exports.generateNFeTx2 = generateNFeTx2;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param dadosNota um objeto contendo os dados iniciais da nota.
 * @param itens um array contendo objetos com os dados dos itens.
 * @param pagamentos um array contendo as informações das formas de pagamento utilizadas.
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
const generateMFeTx2 = (caminhoTx2, dadosNota, itens, pagamentos, tecnico) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (fs.existsSync(caminhoTx2)) {
            reject('Já existe um tx2 no caminho especificado.');
        }
        else {
            yield createHeader(caminhoTx2);
            yield createDadosNota(caminhoTx2, dadosNota);
            yield createDadosItens(caminhoTx2, itens);
            yield createPagamentos(caminhoTx2, pagamentos, 'PAGAMENTO');
            yield createTecnico(caminhoTx2, tecnico);
            resolve(caminhoTx2);
        }
    }));
};
exports.generateMFeTx2 = generateMFeTx2;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
const sendPaymentMfeTx2 = (caminhoTx2, posDataInformation) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        if (fs.existsSync(caminhoTx2)) {
            reject('Já existe um tx2 no caminho especificado.');
        }
        else {
            // IcmsBase= eduardo informou para que seja o valor da venda
            fs.appendFileSync(caminhoTx2, `Formato=TX2\nInterface=EnviarPagamento\nNumeroDocumento=${posDataInformation.docNumber}\nChaveAcessoValidador=${(_a = posDataInformation.company) === null || _a === void 0 ? void 0 : _a.validatorAccessKey}\nChaveRequisicao=${posDataInformation.requestKey}\nEstabelecimento=${posDataInformation.establishment}\nCNPJ=${(_b = posDataInformation.company) === null || _b === void 0 ? void 0 : _b.cnpj}\nIcmsBase=${(_c = posDataInformation.sale) === null || _c === void 0 ? void 0 : _c.value}\nValorTotalVenda=${(_d = posDataInformation.sale) === null || _d === void 0 ? void 0 : _d.value}\nHabilitarMultiplosPagamentos=${(_e = posDataInformation.sale) === null || _e === void 0 ? void 0 : _e.isMultiplesPayments}\nHabilitarControleAntiFraude=false\nCodigoMoeda=BRL\nEmitirCupomNFCE=false\nOrigemPagamento=1`);
            resolve(caminhoTx2);
        }
    }));
};
exports.sendPaymentMfeTx2 = sendPaymentMfeTx2;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
const verifyStatusMfeTx2 = (caminhoTx2, posDataInformation) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (fs.existsSync(caminhoTx2)) {
            reject('Já existe um tx2 no caminho especificado.');
        }
        else {
            // IcmsBase= eduardo informou para que seja o valor da venda
            fs.appendFileSync(caminhoTx2, `Formato=TX2\NnumeroDocumento=${posDataInformation.docNumber}\nInterface=VerificarStatusValidador\nChaveAcessoValidador=${(_a = posDataInformation.company) === null || _a === void 0 ? void 0 : _a.validatorAccessKey}\nIdFila=${posDataInformation.idFila}\nCNPJ=${(_b = posDataInformation.company) === null || _b === void 0 ? void 0 : _b.cnpj}`);
            resolve(caminhoTx2);
        }
    }));
};
exports.verifyStatusMfeTx2 = verifyStatusMfeTx2;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
const invoceResponseMfeTx2 = (caminhoTx2, posDataInformation) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (fs.existsSync(caminhoTx2)) {
            reject('Já existe um tx2 no caminho especificado.');
        }
        else {
            // IcmsBase= eduardo informou para que seja o valor da venda
            fs.appendFileSync(caminhoTx2, `formato=tx2\nNumeroDocumento=${posDataInformation.docNumber}\nInterface=RespostaFiscal\nChaveAcessoValidador=${(_a = posDataInformation.company) === null || _a === void 0 ? void 0 : _a.validatorAccessKey}\nIdFila=${posDataInformation.idFila}\nChaveAcesso=${posDataInformation.requestKey}\nNumeroAprovacao=${posDataInformation.approveCodeNumber}\nBandeira=${(_b = posDataInformation.creditCard) === null || _b === void 0 ? void 0 : _b.brand}\nAdquirente=${(_c = posDataInformation.creditCard) === null || _c === void 0 ? void 0 : _c.companyName}\nCNPJ=${(_d = posDataInformation.company) === null || _d === void 0 ? void 0 : _d.cnpj}\nImpressaoFiscal=<![CDATA[ TANCA
          ${posDataInformation.printerStringify}
        ]]>`);
            resolve(caminhoTx2);
        }
    }));
};
exports.invoceResponseMfeTx2 = invoceResponseMfeTx2;
