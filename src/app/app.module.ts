import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { QuotationCreateComponent } from './quotation-create/quotation-create.component';
import { QuotationService } from './shared/service/quotation.service';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ToggleDisplayService } from './shared/service/toggle-display.service';
import { DragDropDirective } from './shared/directive/drag-and-drop.directive';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { SalesModuleComponent } from './sales-module/sales-module.component';
import { CustomerService } from './shared/service/customer.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { ProcurementModuleComponent } from './procurement-module/procurement-module.component';
import { vendorListComponent } from './vendor-list/vendor-list.component';
import { vendorCreateComponent } from './vendor-create/vendor-create.component';
import { vendorViewComponent } from './vendor-view/vendor-view.component';
import { VendorService } from './shared/service/vendor.service';
import { SalesorderListComponent } from './salesorder-list/salesorder-list.component';
import { SalesorderCreateComponent } from './salesorder-create/salesorder-create.component';
import { SalesorderViewComponent } from './salesorder-view/salesorder-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DesignModuleListComponent } from "./design-module-list/design-module-list.component";
import { PurchaseRequisitionListComponent } from './purchase-requisition-list/purchase-requisition-list.component';
import { PurchaseRequisitionCreateComponent } from './purchase-requisition-create/purchase-requisition-create.component';
import { PurchaseRequisitionViewComponent } from './purchase-requisition-view/purchase-requisition-view.component';
import { DesignModuleCreateComponent } from './design-module-create/design-module-create.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PurchaserequisitionService } from './shared/service/purchaserequisition.service';
import { SalesorderService } from './shared/service/salesorder.service';
import { DesignService } from './shared/service/design.service';
import { DeliveryService } from './shared/service/delivery.service';
import { TabViewModule } from 'primeng/tabview';
import { ProcessControlModuleComponent } from './process-control-module/process-control-module.component';
import { ProcesscontrolCreateComponent } from './processcontrol-create/processcontrol-create.component';
import { DialogModule } from 'primeng/dialog';
import { DesignModuleProjectsComponent } from './design-module-projects/design-module-projects.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DeliveryCreateComponent } from './delivery-create/delivery-create.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { CommentsComponent } from './comments/comments.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { ProcesscontrolViewComponent } from './processcontrol-view/processcontrol-view.component';
import { RatingModule } from 'primeng/rating';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import { DesignModuleViewComponent } from "./design-module-view/design-module-view.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { DesignModuleListFullComponent } from "./design-module-list-full/design-module-list-full.component";
import { CardModule } from 'primeng/card';

// // Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// // Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// // Load themes
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { GraphTwoComponent } from './graph-two/graph-two.component';
import { PurchaseViewComponent } from './purchase-view/purchase-view.component';
import { GraphThreeComponent } from './graph-three/graph-three.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NotificationsComponent } from './notifications/notifications.component';


// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  FusionTheme
)

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuotationListComponent,
    QuotationCreateComponent,
    UploadFileComponent,
    DragDropDirective,
    QuotationViewComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerViewComponent,
    SalesModuleComponent,
    ProcurementModuleComponent,
    vendorListComponent,
    vendorCreateComponent,
    vendorViewComponent,
    SalesorderListComponent,
    SalesorderCreateComponent,
    SalesorderViewComponent,
    LoginComponent,
    DesignModuleListComponent,
    PurchaseRequisitionListComponent,
    PurchaseRequisitionCreateComponent,
    PurchaseRequisitionViewComponent,
    ProcessControlModuleComponent,
    ProcesscontrolCreateComponent,
    DesignModuleCreateComponent,
    DesignModuleProjectsComponent,
    DeliveryCreateComponent,
    DeliveryListComponent,
    PurchaseListComponent,
    PurchaseCreateComponent,
    CommentsComponent,
    EvaluationFormComponent,
    ProcesscontrolViewComponent,
    GraphOneComponent,
    GraphTwoComponent,
    DesignModuleViewComponent,
    PurchaseViewComponent,
    GraphThreeComponent,
    DeliveryViewComponent,
    DesignModuleListFullComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmDialogModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    TabViewModule,
    FormsModule,
    CalendarModule,
    MenuModule,
    DataViewModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    PanelMenuModule,
    TableModule,
    FileUploadModule,
    ContextMenuModule,
    StepsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,
    HttpClientModule,
    NgbModule,
    ProgressBarModule,
    RatingModule,
    NgxSpinnerModule,
    FusionChartsModule,
    OverlayPanelModule,
    CardModule,
  ],
  providers: [QuotationService, PurchaserequisitionService, SalesorderService, DesignService, DeliveryService, CustomerService, VendorService, MessageService, ConfirmationService, ToggleDisplayService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
