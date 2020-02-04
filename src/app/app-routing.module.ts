import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SalesModuleComponent } from "./sales-module/sales-module.component";
import { ProcurementModuleComponent } from "./procurement-module/procurement-module.component";
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { vendorCreateComponent } from "./vendor-create/vendor-create.component";
import { CustomerCreateComponent } from "./customer-create/customer-create.component";
import { QuotationCreateComponent } from "./quotation-create/quotation-create.component";
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { vendorViewComponent } from "./vendor-view/vendor-view.component";
import { SalesorderViewComponent } from "./salesorder-view/salesorder-view.component";
import { SalesorderCreateComponent } from "./salesorder-create/salesorder-create.component";
import { DesignModuleComponent } from "./design-module/design-module.component";
import { PurchaseRequisitionCreateComponent } from './purchase-requisition-create/purchase-requisition-create.component';
import { PurchaseRequisitionViewComponent } from './purchase-requisition-view/purchase-requisition-view.component';
import { ProcessControlModuleComponent } from './process-control-module/process-control-module.component';
import { ProcesscontrolCreateComponent } from './processcontrol-create/processcontrol-create.component';
import { DesignModuleCreateComponent } from './design-module-create/design-module-create.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/sales-module', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sales-module', component: SalesModuleComponent },
  { path: 'procurement-module', component: ProcurementModuleComponent },
  { path: 'customerCreate', component: CustomerCreateComponent },
  { path: 'designCreate', component: DesignModuleCreateComponent },
  { path: 'quotationCreate', component: QuotationCreateComponent },
  { path: 'vendorCreate', component: vendorCreateComponent },
  { path: 'salesorderCreate', component: SalesorderCreateComponent },
  { path: 'requisitionCreate', component: PurchaseRequisitionCreateComponent },
  { path: 'requisitionView/:idx', component: PurchaseRequisitionViewComponent },
  { path: 'quotationView/:idx', component: QuotationViewComponent },
  { path: 'customerView/:idx', component: CustomerViewComponent },
  { path: 'salesorderView/:idx', component: SalesorderViewComponent },
  { path: 'vendorView/:idx', component: vendorViewComponent },
  { path: 'design-module', component: DesignModuleComponent },
  { path: 'process-control-module', component: ProcessControlModuleComponent },
  { path: 'processcontrolCreate', component: ProcesscontrolCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
