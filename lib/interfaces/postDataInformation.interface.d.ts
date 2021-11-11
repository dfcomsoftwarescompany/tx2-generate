export interface posDataInformationInterface {
    docNumber: string;
    company: {
        cnpj: string;
        validatorAccessKey: string;
    };
    requestKey: string;
    Establishment: string;
    sale: {
        value: string;
        isMultiplesPayments: boolean;
    };
}
