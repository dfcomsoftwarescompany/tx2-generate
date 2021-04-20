interface dadosEmitente {
    /** CNPJ do emitente. */
    CNPJ_C02: string;
    /** Razão social ou nome do emitente. */
    xNome_C03: string;
    /** Nome fantasia. */
    xFant_C04: string;
    /** Logradouro. */
    xLgr_C06: string;
    /** Número. */
    nro_C07: number;
    /** Complemento */
    xCpl_C08: string | '';
    /** Bairro */
    xBairro_C09: string;
    /** Código do município */
    cMun_C10: string;
    /** Nome do município */
    xMun_C11: string;
    /** Sigla da UF */
    UF_C12: string;
    /** Código do CEP */
    CEP_C13: string;
    /** Código do País. */
    cPais_C14: string | '1058';
    /** Nome do País. */
    xPais_C15: string | 'BRASIL';
    /** Indicador da IE do destinatário. */
    indIEDest_E16a: number;
    /** Inscrição estadual do destinatário. */
    IE_C17: string;
    /** IE do substituto tributário. */
    IEST_C18: string | '';
    /** Código do regime tributário. */
    CRT_C21: number | 1;
}
export default dadosEmitente;
