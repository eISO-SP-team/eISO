import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DesignService } from "../shared/service/design.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api'

interface options {
  label: string,
  value: string,
}

@Component({
  selector: 'app-design-module-create',
  templateUrl: './design-module-create.component.html',
  styleUrls: ['./design-module-create.component.css']
})

export class DesignModuleCreateComponent implements OnInit {

  projectNo: any = this.designService.selectedProject.project_id;
  projectLead: any = this.designService.selectedProject.project_lead;
  projectName: any = this.designService.selectedProject.project_name;
  startDate: any = this.designService.selectedProject.start_date;
  endDate: any = this.designService.selectedProject.end_date;


  designPlanList: any;

  designphases: options[];

  clickedonPhase: string = "Design Plan";

  backlogEntry: any;

  desginBacklog = [];

  selectedCustomer: any;

  addDesignForm: FormGroup;

  addBacklogForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  value: Date;

  newList: SelectItem[];

  maxCount: any;

  display: boolean;

  selectedProject: any;

  constructor(public designService: DesignService, public router: Router, public _location: Location) {
  }

  ngOnInit() {
    this.designPlanList = this.designService.loadDesigns().subscribe((responseData: any) => {
      this.designPlanList = responseData.body;
      this.maxCount = this.designPlanList.length;
    })

    this.selectedProject = this.designService.selectedProject;
    console.log(this.selectedProject);

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
      "design_id": this.maxCount + 1,
      "project_id": "21313",
      "project_name": "Project X",
      "project_lead": this.addDesignForm.value.project_lead,
      "design_engineer": "Wolverine",
      "start_date": this.addDesignForm.value.start_date,
      "end_date": this.addDesignForm.value.end_date,
      "status": this.addDesignForm.value.status,
      "reference_id": this.maxCount + 1,
      "created_by": "Wolverine",
      "created_date": "2019-11-26",
      "uploaded_by": "Wolverine",
      "uploaded_date": "2019-11-26",
      "design_details": {
        "design_id": this.maxCount + 1,
        "design_details_id": "219",
        "project_id": "1231",
        "line_number": 5,
        "design_date": "2019-11-26",
        "design_phase": "preparation",
        "assignee": "Wolverine",
        "file_type": "pdf",
        "reference_type": "abc",
        "file": "new.pdf",
        "due_date": "2019-11-26T03:36:23.327Z",
        "status": "approved",
        "created_by": "Wolverine",
        "created_date": "2019-11-26T03:36:23.327Z",
        "uploaded_by": "Wolverine",
        "uploaded_date": "2019-11-26T03:36:23.327Z"
      }
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


