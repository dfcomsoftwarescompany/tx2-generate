import DadosNota from './interfaces/dadosNota.interface';
import DadosEmitente from './interfaces/dadosEmitente.interface';
import DadosDestinatario from './interfaces/dadosDestinatario.interface';
import DadosItem from './interfaces/dadosItem.interface';
import Totalizadores from './interfaces/totalizadores.interface';
import Tecnico from './interfaces/tecnico.interface';
import Pagamento from './interfaces/pagamento.interface';
import * as querystring from 'querystring';
import * as fs from 'fs';
import * as request from 'request';
import { PosDataInformationInterface } from './interfaces/postDataInformation.interface';

const createHeader = (caminhoTx2: string) => {
  return new Promise((resolve) => {
    fs.appendFileSync(caminhoTx2, 'formato=tx2\nnumlote=0');
    resolve('Cabeçalho criado com sucesso!');
  });
};

const createDadosNota = (caminhoTx2: string, dadosNota: any) => {
  return new Promise((resolve) => {
    //  Cabeçalho dos dados da nota.
    fs.appendFileSync(caminhoTx2, '\nINCLUIR');
    const keys = Object.keys(dadosNota);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${dadosNota[key]}`);
    });
    resolve('Dados da nota criados com sucesso.');
  });
};

const createDadosEmitente = (caminhoTx2: string, dadosEmitente: any) => {
  return new Promise((resolve) => {
    const keys = Object.keys(dadosEmitente);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${dadosEmitente[key]}`);
    });
    resolve('Dados do emitente criados com sucesso.');
  });
};

const createDadosDestinatario = (caminhoTx2: string, dadosDestinatario: any) => {
  return new Promise((resolve) => {
    const keys = Object.keys(dadosDestinatario);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${dadosDestinatario[key]}`);
    });
    resolve('Dados do emitente criados com sucesso.');
  });
};

const createDadosItens = (caminhoTx2: string, itens: Array<any>) => {
  return new Promise((resolve) => {
    //  Cabeçalho dos dados da nota.
    itens.forEach((item) => {
      fs.appendFileSync(caminhoTx2, '\nINCLUIRITEM');
      const keys = Object.keys(item);
      keys.forEach((key: string) => {
        fs.appendFileSync(caminhoTx2, `\n${key}=${item[key]}`);
      });
      fs.appendFileSync(caminhoTx2, '\nSALVARITEM');
      resolve('Dados dos itens criados com sucesso.');
    });
  });
};

const createPagamentos = (caminhoTx2: string, pagamentos: Array<any>, type: string) => {
  return new Promise((resolve) => {
    pagamentos.forEach((pagamento) => {
      //  Cabeçalho dos dados da nota.
      fs.appendFileSync(caminhoTx2, '\nINCLUIRPARTE=' + type);
      const keys = Object.keys(pagamento);
      keys.forEach((key: string) => {
        fs.appendFileSync(caminhoTx2, `\n${key}=${pagamento[key]}`);
      });
      fs.appendFileSync(caminhoTx2, '\nSALVARPARTE=' + type);
      resolve('Dados do pagamento criados com sucesso.');
    });
  });
};

const createTotalizadores = (caminhoTx2: string, totalizadores: any) => {
  return new Promise((resolve) => {
    // Cabeçalho dos dados da nota.
    const keys = Object.keys(totalizadores);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${totalizadores[key]}`);
    });
    resolve('Dados do pagamento criados com sucesso.');
  });
};

const createAuthGetXml = (caminhoTx2: string, cnpj: string = '', cpf: string = '') => {
  return new Promise((resolve) => {
    if (cnpj || cpf)
      fs.appendFileSync(
        caminhoTx2,
        `\nINCLUIRPARTE=AUTXML\n${cnpj && `CNPJ_GA02=${cnpj}\n`}${cpf && `CPF_GA03=${cpf}\n`}SALVARPARTE=AUTXML`,
      );
    resolve('Dados do pagamento criados com sucesso.');
  });
};

const createTecnico = (caminhoTx2: string, tecnico: any) => {
  return new Promise((resolve) => {
    const keys = Object.keys(tecnico);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${tecnico[key]}`);
    });
    resolve('Dados do pagamento criados com sucesso.');
  });
};

const createObservacoes = (caminhoTx2: string, obs: any) => {
  return new Promise((resolve) => {
    const keys = Object.keys(obs);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${obs[key]}`);
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
export const sendNFCe = (
  tx2Path: string,
  cnpj: string,
  grupo: string,
  authorization: string,
  port: string,
  amb: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = {
      CNPJ: cnpj,
      Grupo: grupo,
      Arquivo: fs.readFileSync(tx2Path, 'utf-8'),
    };
    const formData = querystring.stringify(form);
    const contentLength = formData.length;
    request(
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': contentLength,
          Authorization: authorization,
        },
        url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfce/envia`,
        method: 'POST',
        body: formData,
      },
      (err: any, resp: any, body: any) => {
        if (err) reject(err);
        else {
          resolve(body);
        }
      },
    );
  });
};

/**
 * Envia o arquivo tx2 para a api da tecnospeed e retorna a resposta.
 * @param tx2Path o caminho para o arquivo tx2
 * @param cnpj o cnpj da empresa emitente
 * @param grupo o nome do grupo
 * @param authorization a string de autorização para acessar a api da tecnospeed.
 */
export const sendNFe = (
  tx2Path: string,
  cnpj: string,
  grupo: string,
  authorization: string,
  port: string,
  amb: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = {
      CNPJ: cnpj,
      Grupo: grupo,
      Arquivo: fs.readFileSync(tx2Path, 'utf-8'),
    };
    const formData = querystring.stringify(form);
    const contentLength = formData.length;
    request(
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': contentLength,
          Authorization: authorization,
        },
        url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfe/envia`,
        method: 'POST',
        body: formData,
      },
      (err: any, resp: any, body: any) => {
        if (err) reject(err);
        else {
          resolve(body);
        }
      },
    );
  });
};

/**
 * Gera o conteúdo para impressão da nota fiscal.
 * @param authorization a string de autorização para acessar a api da tecnospeed
 * @param key a chave da nota
 * @param url 0 = conteúdo binário de pdf, 1 = url para download do pdf.
 * @param group nome do grupo
 * @param cnpj cnpj da empresa emitente.
 */
export const print = async (
  authorization: string,
  key: string,
  url: 0 | 1,
  group: string,
  cnpj: string,
  port: string,
  amb: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = {
      ChaveNota: key,
      CNPJ: cnpj,
      Grupo: group,
      Url: url,
    };
    request(
      {
        headers: {
          Authorization: authorization,
        },
        url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfce/imprime`,
        method: 'GET',
        qs: form,
      },
      (err: any, resp: any, body: any) => {
        if (err) reject(err);
        else {
          resolve(body);
        }
      },
    );
  });
};

/**
 * Generates a random string to complement the cNF_B03 value.
 */
export const generatecNF_B03 = (): Promise<string> => {
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
 * @param observacoes Observações
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export const generateNFCeTx2 = (
  caminhoTx2: string,
  dadosNota: DadosNota,
  dadosEmitente: DadosEmitente,
  itens: Array<DadosItem>,
  pagamentos: Array<any>,
  totalizadores: Totalizadores,
  tecnico: Tecnico,
  cnpjAutorizado: string,
  cpfAutorizado: string,
  observacoes: any,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      await createHeader(caminhoTx2);
      await createDadosNota(caminhoTx2, dadosNota);
      await createDadosEmitente(caminhoTx2, dadosEmitente);
      await createDadosItens(caminhoTx2, itens);
      await createAuthGetXml(caminhoTx2, cnpjAutorizado, cpfAutorizado);
      await createPagamentos(caminhoTx2, pagamentos, 'YA');
      await createTotalizadores(caminhoTx2, totalizadores);
      await createTecnico(caminhoTx2, tecnico);
      await createObservacoes(caminhoTx2, observacoes);
      resolve(caminhoTx2);
    }
  });
};

/**
 * Cancela uma NFCe.
 * @param authorization the header authrization string (base 64).
 * @param group the group name
 * @param cnpj the company cnpj
 * @param nfceKey the nfce key
 * @param justify a string justifying the cancel reason
 * @returns
 */
export const cancelNFCe = (
  authorization: string,
  group: string,
  cnpj: string,
  nfceKey: string,
  justify: string,
  port: string,
  amb: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const form = {
        ChaveNota: nfceKey,
        CNPJ: cnpj,
        Grupo: group,
        Justificativa: justify,
      };
      request(
        {
          headers: {
            Authorization: authorization,
          },
          url: `https://managersaas${amb}.tecnospeed.com.br:${port}/ManagerAPIWeb/nfce/cancela`,
          method: 'POST',
          qs: form,
        },
        (err: any, resp: any, body: any) => {
          if (err) reject(err);
          else {
            resolve(body);
          }
        },
      );
    } catch (e) {
      reject(e);
    }
  });
};

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
 * @param observacoes Observações
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export const generateNFeTx2 = (
  caminhoTx2: string,
  dadosNota: DadosNota,
  dadosEmitente: DadosEmitente,
  dadosDestinatario: DadosDestinatario,
  itens: Array<DadosItem>,
  pagamentos: Array<any>,
  totalizadores: Totalizadores,
  tecnico: Tecnico,
  cnpjAutorizado: string,
  cpfAutorizado: string,
  observacoes: any,
) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      await createHeader(caminhoTx2);
      await createDadosNota(caminhoTx2, dadosNota);
      await createDadosEmitente(caminhoTx2, dadosEmitente);
      await createDadosDestinatario(caminhoTx2, dadosDestinatario);
      await createAuthGetXml(caminhoTx2, cnpjAutorizado, cpfAutorizado);
      await createDadosItens(caminhoTx2, itens);
      await createPagamentos(caminhoTx2, pagamentos, 'YA');
      await createTotalizadores(caminhoTx2, totalizadores);
      await createTecnico(caminhoTx2, tecnico);
      await createObservacoes(caminhoTx2, observacoes);
      resolve(caminhoTx2);
    }
  });
};

/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param dadosNota um objeto contendo os dados iniciais da nota.
 * @param itens um array contendo objetos com os dados dos itens.
 * @param pagamentos um array contendo as informações das formas de pagamento utilizadas.
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export const generateMFeTx2 = (
  caminhoTx2: string,
  dadosNota: DadosNota | any,
  itens: Array<DadosItem> | any,
  pagamentos: Array<any>,
  tecnico: Tecnico,
) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      await createHeader(caminhoTx2);
      await createDadosNota(caminhoTx2, dadosNota);
      await createDadosItens(caminhoTx2, itens);
      await createPagamentos(caminhoTx2, pagamentos, 'PAGAMENTO');
      await createTecnico(caminhoTx2, tecnico);
      resolve(caminhoTx2);
    }
  });
};

/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export const sendPaymentMfeTx2 = (caminhoTx2: string, posDataInformation: PosDataInformationInterface) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      // IcmsBase= eduardo informou para que seja o valor da venda
      fs.appendFileSync(
        caminhoTx2,
        `Formato=TX2\nInterface=EnviarPagamento\nNumeroDocumento=${posDataInformation.docNumber}\nChaveAcessoValidador=${posDataInformation.company?.validatorAccessKey}\nChaveRequisicao=${posDataInformation.requestKey}\nEstabelecimento=${posDataInformation.establishment}\nCNPJ=${posDataInformation.company?.cnpj}\nIcmsBase=${posDataInformation.sale?.value}\nValorTotalVenda=${posDataInformation.sale?.value}\nHabilitarMultiplosPagamentos=${posDataInformation.sale?.isMultiplesPayments}\nHabilitarControleAntiFraude=false\nCodigoMoeda=BRL\nEmitirCupomNFCE=false\nOrigemPagamento=1\nSerialPOS=${posDataInformation.serialPOS}\n`,
      );
      resolve(caminhoTx2);
    }
  });
};

/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export const verifyStatusMfeTx2 = (caminhoTx2: string, posDataInformation: PosDataInformationInterface) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      // IcmsBase= eduardo informou para que seja o valor da venda
      fs.appendFileSync(
        caminhoTx2,
        `Formato=TX2\nnumeroDocumento=${posDataInformation.docNumber}\nInterface=VerificarStatusValidador\nChaveAcessoValidador=${posDataInformation.company?.validatorAccessKey}\nIdFila=${posDataInformation.idFila}\nCNPJ=${posDataInformation.company?.cnpj}`,
      );
      resolve(caminhoTx2);
    }
  });
};

/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export const invoceResponseMfeTx2 = (caminhoTx2: string, posDataInformation: PosDataInformationInterface) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      // IcmsBase= eduardo informou para que seja o valor da venda
      fs.appendFileSync(
        caminhoTx2,
        `formato=tx2\nNumeroDocumento=${posDataInformation.docNumber}\nInterface=RespostaFiscal\nChaveAcessoValidador=${posDataInformation.company?.validatorAccessKey}\nIdFila=${posDataInformation.idFila}\nChaveAcesso=${posDataInformation.requestKey}\nNumeroAprovacao=${posDataInformation.approveCodeNumber}\nBandeira=${posDataInformation.creditCard?.brand}\nAdquirente=${posDataInformation.creditCard?.companyName}\nCNPJ=${posDataInformation.company?.cnpj}\nImpressaoFiscal=<![CDATA[ TANCA
          ${posDataInformation.printerStringify}
        ]]>`,
      );
      resolve(caminhoTx2);
    }
  });
};
