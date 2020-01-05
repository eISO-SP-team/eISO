import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: []
})
export class MenuComponent implements OnInit {

    items: MenuItem[];

    constructor(public router: Router, ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Operations',
                icon: 'pi pi-pw pi-file',
                items: [{
                    label: 'Sales',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        { label: 'Customer', 
                          icon: 'pi pi-fw pi-user-plus' },
                        { label: 'Quotation', 
                          icon: 'pi pi-fw pi-filter', 
                          command: (event) => {this.router.navigate(['/quotation'])}},
                        { label: 'Sales Order', 
                          icon: 'pi pi-fw pi-filter' }
                    ]
                },
                {
                    label: 'Design and Development',
                    icon: 'pi pi-fw pi-external-link',
                    items: [
                        { label: 'Design Plan', icon: 'pi pi-fw pi-user-plus' },
                        { label: 'Input', icon: 'pi pi-fw pi-filter' },
                        { label: 'Control', icon: 'pi pi-fw pi-filter' }
                    ]
                },
                { label: 'Process Control', icon: 'pi pi-fw pi-times' },
                {
                    label: 'Procurement/ Purchasing',
                    icon: 'pi pi-fw pi-external-link',
                    items: [
                        { label: 'Vendor', icon: 'pi pi-fw pi-user-plus' },
                        { label: 'Vendor Evaluation', icon: 'pi pi-fw pi-filter' },
                        { label: 'Quotation', icon: 'pi pi-fw pi-filter' },
                        { label: 'Requisition', icon: 'pi pi-fw pi-user-plus' },
                        { label: 'Purchase Order', icon: 'pi pi-fw pi-filter' },
                        { label: 'Delivery', icon: 'pi pi-fw pi-filter' },
                    ]
                },
                ]
            },
        ];
    }
}

