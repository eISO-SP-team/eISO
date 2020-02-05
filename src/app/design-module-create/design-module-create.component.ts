import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DesignService } from "../shared/service/design.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'
import { DialogService } from 'primeng/api';

interface designphases {
  label: string,
  value: string,
}

@Component({
  selector: 'app-design-module-create',
  templateUrl: './design-module-create.component.html',
  styleUrls: ['./design-module-create.component.css']
})

export class DesignModuleCreateComponent implements OnInit {

  designphases: designphases[];

  clickedonPhase: string = "Design Plan";

  backlogEntry: any;

  desginBacklog = [];

  selectedCustomer: any;

  addDesignForm: FormGroup;

  addBacklogForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  customerList: any;

  value: Date;

  newList: SelectItem[];

  DesignList: any;

  maxCount: any;

  display: boolean;

  constructor(public designService: DesignService, public router: Router, public _location: Location) {
  }

  ngOnInit() {
    this.designphases = [
      { label: 'Design Plan', value: 'Design Plan' },
      { label: 'Design Input', value: 'Design Input' },
      { label: 'Design Control', value: 'Design Control' },
      { label: 'Design Ouput', value: 'Design Ouput' }
    ]

    this.addDesignForm = new FormGroup({
      'Project_lead': new FormControl(null, [Validators.required]),
      'Project_name': new FormControl(null, [Validators.required]),
      "Project_no": new FormControl(null, [Validators.required]),
      "Start_date_design": new FormControl(null, [Validators.required]),
      "End_date_design": new FormControl(null, [Validators.required]),
    });

    this.addBacklogForm = new FormGroup({
      "design_phase": new FormControl(null, [Validators.required]),
      "who": new FormControl(null, [Validators.required]),
      "due_date": new FormControl(null, [Validators.required]),
      "status": new FormControl(null, [Validators.required]),

    });
  }

  handleChange(e) {
    var index = e.index;

    if (index == 0) {
      this.clickedonPhase = "Design Plan";
    } else if (index == 1) {
      this.clickedonPhase = "Design Input";
    } else if (index == 2) {
      this.clickedonPhase = "Design Control";
    } else {
      this.clickedonPhase = "Design Output";
    }
    console.log(this.clickedonPhase);
  }
  showDialog() {
    this.display = true;
  }

  onSubmitDesignPlan() {
    this.testEntry = {

    }
  }

  onSubmitBacklog() {
    this.backlogEntry = {
      "design_id": "12890430",
      "design_details_id": "219",
      "project_id": "1231",
      "line_number": 5,
      "design_date": this.addBacklogForm.value.due_date,
      "design_phase": this.clickedonPhase,
      "assignee": "Wolverine",
      "file_type": "pdf",
      "reference_type": "abc",
      "file": "new.pdf",
      "due_date": this.addBacklogForm.value.due_date,
      "status": "pending",
      "created_by": this.addBacklogForm.value.who,
      "created_date": this.myDate,
      "uploaded_by": this.addBacklogForm.value.who,
      "uploaded_date": this.myDate
    }
    this.desginBacklog.unshift(this.backlogEntry);
    this.display = false;
    this.addBacklogForm.reset();
  }

}


