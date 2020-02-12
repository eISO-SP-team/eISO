import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    
    @Output() onClose = new EventEmitter();

    constructor(public router: Router, ) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Operations',
                icon: 'pi pi-pw pi-file',
                items: [{
                    label: 'Sales',
                    icon: 'pi pi-fw pi-plus',
                    command: (event) => { this.router.navigate(['/sales-module']) }
                },
                {
                    label: 'Design and Development',
                    icon: 'pi pi-fw pi-external-link',
                    command: (event) => { this.router.navigate(['/design-module']) }
                },
                {
                    label: 'Process Control',
                    icon: 'pi pi-fw pi-times',
                    command: (event) => { this.router.navigate(['/process-control-module']) }
                },
                {
                    label: 'Procurement/ Purchasing',
                    icon: 'pi pi-fw pi-external-link',
                    command: (event) => { this.router.navigate(['/procurement-module']) }
                },
                ]
            },
        ];
    }
    ngAfterViewInit() {
        this.router.url;
    }

    closeMenu(){
       this.onClose.emit(false);
    }
}

