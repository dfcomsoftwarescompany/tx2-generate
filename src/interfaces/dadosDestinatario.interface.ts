interface DadosDestinatario {
  /** CPF do destinatário. */
  CPF_E03: string;
  /** Identificação do destinatário no caso de comprador estrangeiro. (string vazia caso n seja) */
  idEstrangeiro_E03a: string;
  /** Razão social ou nome do destinatário. */
  xNome_E04: string;
  /** Logradouro */
  xLgr_E06: string;
  /** Número */
  nro_E07: string;
  /** Bairro */
  xBairro_E09: string;
  /** Código do município */
  cMun_E10: string;
  /** Nome do município. */
  xMun_E11: string;
  /** Sigla da UF */
  UF_E12: string;
}

export default DadosDestinatario;
