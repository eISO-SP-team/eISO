export class Customer {
    constructor(
        public customer_refNo: number,
        public customer_companyName: string,
        public customer_type: string,
        public customer_country: string,
        public customer_city: string,
        public customer_address1: string,
        public customer_address2: string,
        public customer_zipcode: string,
        public customer_contacts: string,
    ) { }
}

export class Customer1 {
    constructor(
        public customer_customerName: string,
        public customer_type: string,
        public customer_taxId: string,
        public customer_prefix: string,
        public customer_mobile: string,
        public customer_lastName: string,
        public customer_middleName: string,
        public customer_firstName: string,
        public customer_faxNo: string,
        public customer_extension: string,
        public customer_email: string,
        public customer_country: string,
        public customer_address1: string,
        public customer_address2: string,
        public customer_zipcode: string,
        public customer_contacts: string,
    ) { }
}
