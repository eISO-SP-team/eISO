import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import {CalendarModule} from 'primeng/calendar';
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
import { QuotationComponent } from './quotation/quotation.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { QuotationDashboardComponent } from './quotation-dashboard/quotation-dashboard.component';
import { ToggleDisplayService } from './shared/service/toggle-display.service';
import { DragDropDirective } from './shared/directive/drag-and-drop.directive';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { CustomerComponent } from './customer/customer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuotationListComponent,
    QuotationCreateComponent,
    QuotationComponent,
    UploadFileComponent,
    QuotationDashboardComponent,
    DragDropDirective,
    QuotationViewComponent,
    CustomerComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
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
  ],
  providers: [QuotationService, CustomerService, VendorService, MessageService, ToggleDisplayService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
