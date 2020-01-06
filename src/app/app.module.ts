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
import { QuotationEditComponent } from './quotation-edit/quotation-edit.component';
import { DragDropDirective } from './shared/directive/drag-and-drop.directive';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { SalesModuleComponent } from './sales-module/sales-module.component';
import { CustomerService } from './shared/service/customer.service';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuotationListComponent,
    QuotationCreateComponent,
    QuotationComponent,
    UploadFileComponent,
    QuotationDashboardComponent,
    QuotationEditComponent,
    DragDropDirective,
    QuotationViewComponent,
    CustomerComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerViewComponent,
    SalesModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
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
  ],
  providers: [QuotationService, CustomerService, MessageService, ToggleDisplayService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
