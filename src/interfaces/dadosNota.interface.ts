interface dadosNota {
  /** Não preencher */
  Id_A03?: number | 0;
  /** Versão */
  versao_A02?: string | '4.00';
  /** UF do emitente. */
  cUF_B02: number;
  /** Código gerado pelo sistema para nosso controle. Até 8 dígitos. */
  cNF_B03: string;
  /** Descrição da natureza da operação. */
  natOp_B04?: string | 'VENDA';
  /** 65 = NFCe | 55 = NFe*/
  mod_B06?: number | 65;
  /** Cada operador do caixa vai ter sua série. */
  serie_B07: number;
  /** Controle da numeração pelo SaaS. */
  nNF_B08?: number | 200;
  /** Data e hora de emissão do documento fiscal. */
  dhEmi_B09: string;
  /** Tipo de operação. */
  tpNF_B11?: number | 1;
  /** Identificador de local de destino da operação. */
  idDest_B11a?: number | 1;
  /** Código do município de ocorrência do fato gerador. */
  cMunFG_B12: number;
  /** Formato de impressão do DANFE. */
  tpImp_B21?: number | 4;
  /** Tipo de emissão da NF-e. */
  tpEmis_B22?: number | 1;
  /** Dígito verificador da chave de acesso da NF-e. */
  cDV_B23?: number | 0;
  /** Identificação do ambiente. */
  tpAmb_B24?: number | 2;
  /** Versão do processo de emissão da NF-e. */
  finNFe_B25?: number | 1;
  /** Indica operação com consumidor final. */
  indFinal_B25a?: number | 1;
  /** Indicador de presença do comprador no estabelecimento comercial no momento da operação. */
  indPres_B25b?: number | 1;
  /** Processo de emissão da NF-e. */
  procEmi_B26?: number | 0;
  /** Versão do processo de emissão da NF-e. */
  verProc_B27?: string | 'dfcomonline 1.0';
  /** Indicador de intermediador */
  indIntermed_B25c: 0;
}
export default dadosNota;
