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
import { DesignModuleListComponent } from "./design-module-list/design-module-list.component";
import { PurchaseRequisitionCreateComponent } from './purchase-requisition-create/purchase-requisition-create.component';
import { PurchaseRequisitionViewComponent } from './purchase-requisition-view/purchase-requisition-view.component';
import { ProcessControlModuleComponent } from './process-control-module/process-control-module.component';
import { ProcesscontrolCreateComponent } from './processcontrol-create/processcontrol-create.component';
import { DesignModuleCreateComponent } from './design-module-create/design-module-create.component';
import { DesignModuleProjectsComponent } from './design-module-projects/design-module-projects.component';
import { DeliveryCreateComponent } from './delivery-create/delivery-create.component';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { EvaluationFormComponent } from "./evaluation-form/evaluation-form.component";
import { ProcesscontrolViewComponent } from './processcontrol-view/processcontrol-view.component';
import { DesignModuleViewComponent } from './design-module-view/design-module-view.component';
import { PurchaseViewComponent } from './purchase-view/purchase-view.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SalesorderListComponent } from './salesorder-list/salesorder-list.component';
import { DesignModuleListFullComponent } from './design-module-list-full/design-module-list-full.component';

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
  { path: 'design-module', component: DesignModuleListComponent },
  { path: 'process-control-module', component: ProcessControlModuleComponent },
  { path: 'processcontrolCreate', component: ProcesscontrolCreateComponent },
  { path: 'selectproject', component: DesignModuleProjectsComponent },
  { path: 'deliveryCreate', component: DeliveryCreateComponent },
  { path: 'purchaseCreate', component: PurchaseCreateComponent },
  { path: 'evaluation-form', component: EvaluationFormComponent },
  { path: 'process-control-view/:idx', component: ProcesscontrolViewComponent },
  { path: 'designView/:idx', component: DesignModuleViewComponent },
  { path: 'poView/:idx', component: PurchaseViewComponent },
  { path: 'doView/:idx', component: DeliveryViewComponent },
  { path: 'quotationList', component: QuotationListComponent },
  { path: 'customerList', component: CustomerListComponent },
  { path: 'salesList', component: SalesorderListComponent },
  { path: 'designList', component: DesignModuleListFullComponent },
  { path: '*', redirectTo: "/sales-modules" },
  // { path: '**', redirectTo:"/sales-modules"}

];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
