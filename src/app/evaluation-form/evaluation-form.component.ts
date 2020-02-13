import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { formatDate } from '@angular/common';
import { ConfirmationService, Message } from 'primeng/api';
import { FileUploadService } from "../shared/service/file-upload.service";
import { Router } from '@angular/router';
import {RatingModule} from 'primeng/rating';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {

  msgs: Message[] = [];
  
  addForm: FormGroup;

  newList: SelectItem[];

  quality: number;

  constructor(private confirmationservice: ConfirmationService) { }

  ngOnInit() {

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
      'total': new FormControl(null, [Validators.required]),
      'approvedDate': new FormControl(null, [Validators.required]),
      'approvedBy': new FormControl(null, [Validators.required]),
      'resultOfEval': new FormControl(null, [Validators.required]),
    })
  }

  

  // confirm() {
  //   this.confirmationservice.confirm({
  //     message: 'Are you sure that you want to proceed?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
  //       this.onAddEnquiry();
  //     },
  //     reject: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });
  // }



}
