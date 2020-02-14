import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SelectItem } from 'primeng/api'
import { formatDate } from '@angular/common';
import { ConfirmationService, Message } from 'primeng/api';
import { FileUploadService } from "../shared/service/file-upload.service";
import { VendorService } from '../shared/service/vendor.service';
import { DialogDisplayService } from "../shared/service/dialog-display.service";


@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {

  msgs: Message[] = [];

  evaluatedBy: SelectItem[];

  entryData: any;

  addForm: FormGroup;

  newList: SelectItem[];

  newSupplierName = this.vendorService.selectedVendornService.vendor_name;
  newProduct = this.vendorService.selectedVendornService.products;
  newServices = this.vendorService.selectedVendornService.services;
  newSupplierNo = this.vendorService.selectedVendornService.id;

  qualityScore: number = 0;
  costScore: number = 0;
  accident_rateScore: number = 0;
  deliveryScore: number = 0;
  safetyScore: number = 0;
  riskScore: number = 0;
  totalScore: number = this.qualityScore +
    this.costScore +
    this.accident_rateScore +
    this.deliveryScore +
    this.safetyScore +
    this.riskScore;

  isCollapsed: boolean;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  display: boolean;

  constructor(private confirmationservice: ConfirmationService, public vendorService: VendorService, public dialogDisplayService: DialogDisplayService) { }

  ngOnInit() {
    this.evaluatedBy = [
      { label: "Robert", value: "Robert" },
      { label: "Sam", value: "Sam" },
      { label: "Tom", value: "Tom" },
    ]
    this.addForm = new FormGroup({
      'supplierName': new FormControl(null, [Validators.required]),
      'product': new FormControl(null, [Validators.required]),
      'services': new FormControl(null, [Validators.required]),
      'supplierNo': new FormControl(null, [Validators.required]),
      'evaluator': new FormControl(null, [Validators.required]),
      'evaluationDate': new FormControl(null, [Validators.required]),
      'quality': new FormControl(null, [Validators.required]),
      'cost': new FormControl(null, [Validators.required]),
      'accidentRate': new FormControl(null, [Validators.required]),
      'delivery': new FormControl(null, [Validators.required]),
      'safety': new FormControl(null, [Validators.required]),
      'risk': new FormControl(null, [Validators.required]),
      'approvedDate': new FormControl(null, [Validators.required]),
      'approvedBy': new FormControl(null, [Validators.required]),
      'resultOfEval': new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    this.entryData = {
      "evaluation_id": this.vendorService.evalList.length + 1,
      "vendor_id": this.vendorService.selectedVendornService.id,
      "evaluated_by": this.addForm.value.evaluator,
      "evaluation_date": this.addForm.value.evaluationDate,
      "quality": this.qualityScore,
      "cost": this.costScore,
      "accident_rate": this.accident_rateScore,
      "delivery": this.deliveryScore,
      "safety": this.safetyScore,
      "risk": this.riskScore,
      "total_score": this.totalScore,
      "action": this.addForm.value.resultOfEval,
      "approval_date": this.addForm.value.approval_date,
      "approved_by": this.addForm.value.approved_by,
      "created_by": "Isaac",
      "created_date": this.myDate,
      "updated_by": "Isaac",
      "updated_date": this.myDate,
    }
    console.log(this.entryData);
    this.vendorService.evalList.unshift(this.entryData);
  }

  handleRateQuality(event) {
    this.qualityScore = event.value;
    this.totalScore = this.qualityScore +
      this.costScore +
      this.accident_rateScore +
      this.deliveryScore +
      this.safetyScore +
      this.riskScore;
  }

  handleRateAccident(event) {
    this.accident_rateScore = event.value;
    this.totalScore = this.qualityScore +
      this.costScore +
      this.accident_rateScore +
      this.deliveryScore +
      this.safetyScore +
      this.riskScore;
  }

  handleRateSafety(event) {
    this.safetyScore = event.value;
    this.totalScore = this.qualityScore +
      this.costScore +
      this.accident_rateScore +
      this.deliveryScore +
      this.safetyScore +
      this.riskScore;
  }

  handleRateCost(event) {
    this.costScore = event.value;
    this.totalScore = this.qualityScore +
      this.costScore +
      this.accident_rateScore +
      this.deliveryScore +
      this.safetyScore +
      this.riskScore;
  }

  handleRateDelivery(event) {
    this.deliveryScore = event.value;
    this.totalScore = this.qualityScore +
      this.costScore +
      this.accident_rateScore +
      this.deliveryScore +
      this.safetyScore +
      this.riskScore;
  }

  handleRateRisk(event) {
    this.riskScore = event.value;
    this.totalScore = this.qualityScore +
      this.costScore +
      this.accident_rateScore +
      this.deliveryScore +
      this.safetyScore +
      this.riskScore;
  }

  confirm() {
    this.confirmationservice.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.onSubmit();
        this.showDialog();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  showDialog() {
    this.dialogDisplayService.display = false;
  }
}
