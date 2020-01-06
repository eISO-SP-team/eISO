// export class Quotation {
//     constructor(
//         public quotation_refNo: number,
//         public quotation_date: string,
//         public quotation_prospectName: string,
//         public quotation_contactPerson: string,
//         public quotation_address: string,
//         public quotation_telNo: string,
//         public quotation_email: string,
//         public quotation_fax: string,
//         public quotation_description: string,
//         public quotation_subPerson: string,
//         public quotation_status: string) { }
// }

export class Quotation {
    constructor(
        public quotation_refNo: number,
        public quotation_title: string,
        public quotation_subject: string,
        public quotation_tenderLocation: string,
        public quotation_to: string,
        public quotation_validity: string,
        public quotation_attention: string,
        public quotation_total: string,
        public quotation_deposit: string,
        public quotation_status: string) { }
}