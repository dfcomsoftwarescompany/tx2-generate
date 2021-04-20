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
import { rejects } from 'assert';

const createHeader = (caminhoTx2: string) => {
  return new Promise((resolve, reject) => {
    fs.appendFileSync(caminhoTx2, 'formato=tx2\nnumlote=0');
    resolve('Cabeçalho criado com sucesso!');
  });
};

const createDadosNota = (caminhoTx2: string, dadosNota: any) => {
  return new Promise((resolve, reject) => {
    //Cabeçalho dos dados da nota.
    fs.appendFileSync(caminhoTx2, '\nINCLUIR');
    const keys = Object.keys(dadosNota);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${dadosNota[key]}`);
    });
    resolve('Dados da nota criados com sucesso.');
  });
};

const createDadosEmitente = (caminhoTx2: string, dadosEmitente: any) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(dadosEmitente);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${dadosEmitente[key]}`);
    });
    resolve('Dados do emitente criados com sucesso.');
  });
};

const createDadosDestinatario = (caminhoTx2: string, dadosDestinatario: any) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(dadosDestinatario);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${dadosDestinatario[key]}`);
    });
    resolve('Dados do emitente criados com sucesso.');
  });
};

const createDadosItens = (caminhoTx2: string, itens: Array<any>) => {
  return new Promise((resolve, reject) => {
    //Cabeçalho dos dados da nota.
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

const createPagamentos = (caminhoTx2: string, pagamentos: Array<any>) => {
  return new Promise((resolve, reject) => {
    pagamentos.forEach((pagamento) => {
      //Cabeçalho dos dados da nota.
      fs.appendFileSync(caminhoTx2, '\nINCLUIRPARTE=YA');
      const keys = Object.keys(pagamento);
      keys.forEach((key: string) => {
        fs.appendFileSync(caminhoTx2, `\n${key}=${pagamento[key]}`);
      });
      fs.appendFileSync(caminhoTx2, '\nSALVARPARTE=YA');
      resolve('Dados do pagamento criados com sucesso.');
    });
  });
};

const createTotalizadores = (caminhoTx2: string, totalizadores: any) => {
  return new Promise((resolve, reject) => {
    //Cabeçalho dos dados da nota.
    const keys = Object.keys(totalizadores);
    keys.forEach((key: string) => {
      fs.appendFileSync(caminhoTx2, `\n${key}=${totalizadores[key]}`);
    });
    resolve('Dados do pagamento criados com sucesso.');
  });
};

const createTecnico = (caminhoTx2: string, tecnico: any) => {
  return new Promise((resolve, reject) => {
    //Cabeçalho dos dados da nota.
    const keys = Object.keys(tecnico);
    keys.forEach((key: string) => {
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
export const sendNFCe = (tx2Path: string, cnpj: string, grupo: string, authorization: string): Promise<String> => {
  return new Promise((resolve, reject) => {
    const form = {
      CNPJ: cnpj,
      Grupo: grupo,
      Arquivo: fs.readFileSync(tx2Path, 'utf-8'),
    };
    let formData = querystring.stringify(form);
    let contentLength = formData.length;
    request(
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': contentLength,
          Authorization: authorization,
        },
        url: 'https://managersaas.tecnospeed.com.br:8081/ManagerAPIWeb/nfce/envia',
        method: 'POST',
        body: formData,
      },
      (err, resp, body) => {
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
export const sendNFe = (tx2Path: string, cnpj: string, grupo: string, authorization: string): Promise<String> => {
  return new Promise((resolve, reject) => {
    const form = {
      CNPJ: cnpj,
      Grupo: grupo,
      Arquivo: fs.readFileSync(tx2Path, 'utf-8'),
    };
    let formData = querystring.stringify(form);
    let contentLength = formData.length;
    request(
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': contentLength,
          Authorization: authorization,
        },
        url: 'https://managersaas.tecnospeed.com.br:8081/ManagerAPIWeb/nfe/envia',
        method: 'POST',
        body: formData,
      },
      (err, resp, body) => {
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
): Promise<String> => {
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
        url: 'https://managersaas.tecnospeed.com.br:8081/ManagerAPIWeb/nfce/imprime',
        method: 'GET',
        qs: form,
      },
      (err, resp, body) => {
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
export const generatecNF_B03 = (): Promise<String> => {
  return new Promise((resolve, reject) => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
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
): Promise<String> => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      await createHeader(caminhoTx2);
      await createDadosNota(caminhoTx2, dadosNota);
      await createDadosEmitente(caminhoTx2, dadosEmitente);
      await createDadosItens(caminhoTx2, itens);
      await createPagamentos(caminhoTx2, pagamentos);
      await createTotalizadores(caminhoTx2, totalizadores);
      await createTecnico(caminhoTx2, tecnico);
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
): Promise<String> => {
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
          url: 'https://managersaas.tecnospeed.com.br:8081/ManagerAPIWeb/nfce/cancela',
          method: 'POST',
          qs: form,
        },
        (err, resp, body) => {
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
) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(caminhoTx2)) {
      reject('Já existe um tx2 no caminho especificado.');
    } else {
      await createHeader(caminhoTx2);
      await createDadosNota(caminhoTx2, dadosNota);
      await createDadosEmitente(caminhoTx2, dadosEmitente);
      await createDadosDestinatario(caminhoTx2, dadosDestinatario);
      await createDadosItens(caminhoTx2, itens);
      await createPagamentos(caminhoTx2, pagamentos);
      await createTotalizadores(caminhoTx2, totalizadores);
      await createTecnico(caminhoTx2, tecnico);
      resolve(caminhoTx2);
    }
  });
};
