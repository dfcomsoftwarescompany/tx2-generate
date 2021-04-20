interface dadosItem {
    /** Número do item. */
    nItem_H02: number;
    /** GTIN do produto, antigo código EAN ou código de barras. */
    cEAN_I03: string;
    /** Código do produto ou serviço. */
    cProd_I02: string;
    /** Descrição do produto ou serviço. */
    xProd_I04: string;
    /** Código NCM com 8 dígitos. */
    NCM_I05: string;
    /** Código CEST. */
    CEST_I05c: string;
    /** Código fiscal de operações e prestações. */
    CFOP_I08: string;
    /** Unidade comercial. */
    uCom_I09: string;
    /** Quantidade comercial. */
    qCom_I10: number;
    /** Valor unitário de comercialização. */
    vUnCom_I10a: number;
    /** Valor total bruto dos produtos ou serviços. */
    vProd_I11: number;
    /** GTIN da unidade tributável, antigo código EAN. */
    cEANTrib_I12: number;
    /** Unidade tributável. */
    uTrib_I13: string;
    /** Quantidade tributável. */
    qTrib_I14a: number;
    /** Valor unitário de tributação. */
    vUnTrib_I14a: number;
    /** Indica se valor do item (vProd) entra no valor total da NF-e (vProd) */
    indTot_I17b: number;
    /** Origem da mercadoria. */
    orig_N11: number;
    /** Tributação do ICMS = 00 */
    CST_N12: string;
}
export default dadosItem;
