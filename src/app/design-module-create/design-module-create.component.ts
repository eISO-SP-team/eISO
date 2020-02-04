import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DesignService } from "../shared/service/design.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'


@Component({
  selector: 'app-design-module-create',
  templateUrl: './design-module-create.component.html',
  styleUrls: ['./design-module-create.component.css']
})

export class DesignModuleCreateComponent implements OnInit {


  
    selectedCustomer: any;
  
    addDesignForm: FormGroup;
  
    testEntry: any;
  
    activeIndex: number = 0;
  
    myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  
    customerList: any;
  
    value: Date;
  
    newList: SelectItem[];
  
    DesignList: any;
  
    maxCount: any;
  
    constructor(public designService: DesignService,public router:Router ,public _location: Location) {
    }

  ngOnInit() {
    this.addDesignForm = new FormGroup({
      'Project_lead': new FormControl(null, [Validators.required]),
      'Project_name': new FormControl(null, [Validators.required]),
      "Project_no": new FormControl(null, [Validators.required]),
      "Start_date_design": new FormControl(null, [Validators.required]),
      "End_date_design": new FormControl(null, [Validators.required]),
    })
  }
  }


