export class Salesorder {
    constructor(
        public salesorder_refNo: number,
        public salesorder_type: string,
        public salesorder_quotationRefNo: number,
        public salesorder_custName: string,
        public salesorder_date: string,
        public salesorder_subject: string,
        public salesorder_tenderLocation: string,
        public salesorder_pic:string,
        public salesorder_picEmail:string,
        public salesorder_total: string,
        public salesorder_deposit: string,
        ) { }
}

