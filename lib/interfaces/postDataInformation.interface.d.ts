export interface posDataInformationInterface {
    docNumber?: string;
    company?: {
        cnpj?: string;
        validatorAccessKey?: string;
    };
    requestKey?: string;
    establishment?: string;
    sale?: {
        value?: string;
        isMultiplesPayments?: boolean;
    };
    idFila?: string | null;
    approveCodeNumber?: string;
    creditCard?: {
        brand?: string;
        companyName?: string;
    };
    printterStringfy?: string;
}
