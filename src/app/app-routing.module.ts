import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesModuleComponent } from "./sales-module/sales-module.component";
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationEditComponent } from './quotation-edit/quotation-edit.component';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { CustomerCreateComponent } from "./customer-create/customer-create.component";
import { QuotationCreateComponent } from "./quotation-create/quotation-create.component";


const AppRoutes: Routes = [
  { path: '', redirectTo: '/sales-module', pathMatch: 'full' },
  { path: 'sales-module', component: SalesModuleComponent },
  { path: 'customerCreate', component: CustomerCreateComponent },
  { path: 'quotationCreate', component: QuotationCreateComponent },
  { path: 'quotationEdit/:idx', component: QuotationEditComponent },
  { path: 'quotationView/:idx', component: QuotationViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
