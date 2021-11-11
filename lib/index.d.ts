import DadosNota from './interfaces/dadosNota.interface';
import DadosEmitente from './interfaces/dadosEmitente.interface';
import DadosDestinatario from './interfaces/dadosDestinatario.interface';
import DadosItem from './interfaces/dadosItem.interface';
import Totalizadores from './interfaces/totalizadores.interface';
import Tecnico from './interfaces/tecnico.interface';
import { posDataInformationInterface } from './interfaces/postDataInformation.interface';
/**
 * Envia o arquivo tx2 para a api da tecnospeed e retorna a resposta.
 * @param tx2Path o caminho para o arquivo tx2
 * @param cnpj o cnpj da empresa emitente
 * @param grupo o nome do grupo
 * @param authorization a string de autorização para acessar a api da tecnospeed.
 */
export declare const sendNFCe: (tx2Path: string, cnpj: string, grupo: string, authorization: string, port: string, amb: string) => Promise<string>;
/**
 * Envia o arquivo tx2 para a api da tecnospeed e retorna a resposta.
 * @param tx2Path o caminho para o arquivo tx2
 * @param cnpj o cnpj da empresa emitente
 * @param grupo o nome do grupo
 * @param authorization a string de autorização para acessar a api da tecnospeed.
 */
export declare const sendNFe: (tx2Path: string, cnpj: string, grupo: string, authorization: string, port: string, amb: string) => Promise<string>;
/**
 * Gera o conteúdo para impressão da nota fiscal.
 * @param authorization a string de autorização para acessar a api da tecnospeed
 * @param key a chave da nota
 * @param url 0 = conteúdo binário de pdf, 1 = url para download do pdf.
 * @param group nome do grupo
 * @param cnpj cnpj da empresa emitente.
 */
export declare const print: (authorization: string, key: string, url: 0 | 1, group: string, cnpj: string, port: string, amb: string) => Promise<string>;
/**
 * Generates a random string to complement the cNF_B03 value.
 */
export declare const generatecNF_B03: () => Promise<string>;
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
export declare const generateNFCeTx2: (caminhoTx2: string, dadosNota: DadosNota, dadosEmitente: DadosEmitente, itens: Array<DadosItem>, pagamentos: Array<any>, totalizadores: Totalizadores, tecnico: Tecnico, cnpjAutorizado: string, cpfAutorizado: string) => Promise<string>;
/**
 * Cancela uma NFCe.
 * @param authorization the header authrization string (base 64).
 * @param group the group name
 * @param cnpj the company cnpj
 * @param nfceKey the nfce key
 * @param justify a string justifying the cancel reason
 * @returns
 */
export declare const cancelNFCe: (authorization: string, group: string, cnpj: string, nfceKey: string, justify: string, port: string, amb: string) => Promise<string>;
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
export declare const generateNFeTx2: (caminhoTx2: string, dadosNota: DadosNota, dadosEmitente: DadosEmitente, dadosDestinatario: DadosDestinatario, itens: Array<DadosItem>, pagamentos: Array<any>, totalizadores: Totalizadores, tecnico: Tecnico, cnpjAutorizado: string, cpfAutorizado: string) => Promise<unknown>;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param dadosNota um objeto contendo os dados iniciais da nota.
 * @param itens um array contendo objetos com os dados dos itens.
 * @param pagamentos um array contendo as informações das formas de pagamento utilizadas.
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export declare const generateMFeTx2: (caminhoTx2: string, dadosNota: DadosNota | any, itens: Array<DadosItem> | any, pagamentos: Array<any>, tecnico: Tecnico) => Promise<unknown>;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export declare const sendPaymentMfeTx2: (caminhoTx2: string, posDataInformation: posDataInformationInterface) => Promise<unknown>;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export declare const verifyStatusMfeTx2: (caminhoTx2: string, posDataInformation: posDataInformationInterface) => Promise<unknown>;
/**
 * Gera o arquivo tx2 (para NFe) no caminho especificado.
 * @param caminhoTx2 o caminho onde o tx2 será gerado (um arquivo com o mesmo nome não pode existir)
 * @param posDataInformation Informações para emitir o tx2
 * @return retorna uma string do caminho onde o arquivo foi gerado
 */
export declare const invoceResponseMfeTx2: (caminhoTx2: string, posDataInformation: posDataInformationInterface) => Promise<unknown>;
