interface totalizadores {
  /** Base de cálculo do ICMS. */
  vBC_W03: number;
  /** Valor total do ICMS. */
  vICMS_W04: number;
  /** Valor total do ICMS desonerado. */
  vICMSDeson_W04a: number;
  /** Valor total do ICMS relativo fundo de combate à pobreza (FCP) da UF de destino. */
  vFCPUFDest_W04c: number;
  /** Valor total do ICMS interestadual para a UF de destino. */
  VICMSUFDest_W04e: number;
  /** Valor total do ICMS interestadual para a UF do remetente. */
  VICMSUFRemet_W04g: number;
  /** Valor total do FCP (fundo de combate à pobreza). */
  vFCP_W04h: number;
  /** Base de cálculo do ICMS ST. */
  vBCST_W05: number;
  /** Valor total do ICMS ST. */
  vST_W06: number;
  /** Valor total do FCP retido por substituição tributária. */
  vFCPST_W06a: number;
  /** Valor total do FCP retido anteriormente por substituição tributária. */
  vFCPSTRet_W06b: number;
  /** Valor total dos produtos e serviços. */
  vProd_W07: number;
  /** Valor total do frete. */
  vFrete_W08: number;
  /** Valor total do seguro. */
  vSeg_W09: number;
  /** Valor total do desconto. */
  vDesc_W10: number;
  /** Valor total do II. */
  vII_W11: number;
  /** Valor total do IPI. */
  vIPI_W12: number;
  /** Valor total do IPI devolvido. */
  vIPIDevol_W12a: number;
  /** Valor total do PIS. */
  vPIS_W13: number;
  /** Valor total do COFINS. */
  vCOFINS_W14: number;
  /** Valor total de outras despesas. */
  vOutro_W15: number;
  /** Valor total da NF-e. */
  vNF_W16: number;
  /** Valor aproximado total de tributos federais, estaduais e municipais. */
  vTotTrib_W16a: number;
  /** Modalidade do frete. */
  modFrete_X02: number;
  /** Informações complementares de interesse contribuinte. */
  infCpl_Z03: number;
}

export default totalizadores;
