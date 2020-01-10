import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesModuleComponent } from "./sales-module/sales-module.component";
import { ProcurementModuleComponent } from "./procurement-module/procurement-module.component";
import { QuotationEditComponent } from './quotation-edit/quotation-edit.component';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { vendorCreateComponent } from "./vendor-create/vendor-create.component";
import { CustomerCreateComponent } from "./customer-create/customer-create.component";
import { QuotationCreateComponent } from "./quotation-create/quotation-create.component";
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';


const AppRoutes: Routes = [
  { path: '', redirectTo: '/sales-module', pathMatch: 'full' },
  { path: 'sales-module', component: SalesModuleComponent },
  { path: 'procurement-module', component: ProcurementModuleComponent },
  { path: 'customerCreate', component: CustomerCreateComponent },
  { path: 'quotationCreate', component: QuotationCreateComponent },
  { path: 'vendorCreate', component: vendorCreateComponent },
  { path: 'quotationEdit/:idx', component: QuotationEditComponent },
  { path: 'quotationView/:idx', component: QuotationViewComponent },
  { path: 'customerEdit/:idx', component: CustomerEditComponent },
  { path: 'customerView/:idx', component: CustomerViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
