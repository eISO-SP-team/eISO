import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DesignService } from "../shared/service/design.service";
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { FileUploadService } from "../shared/service/file-upload.service";

interface options {
  label: string,
  value: string,
}

@Component({
  selector: 'app-design-module-view',
  templateUrl: './design-module-view.component.html',
  styleUrls: ['./design-module-view.component.css']
})

export class DesignModuleViewComponent implements OnInit {

  newProject_no: any = this.designService.selectedDesignInService.project_id;
  newProject_lead: any = this.designService.selectedDesignInService.project_lead;
  newProject_name: any = this.designService.selectedDesignInService.project_name;
  newStart_date_design: any = this.designService.selectedDesignInService.start_date;
  newEnd_date_design: any = this.designService.selectedDesignInService.end_date;

  designPlanList: any;

  designphases: options[];

  clickedonPhase: string = "Design Plan";

  backlogEntry: any;

  desginBacklog: any[] = [];

  selectedCustomer: any;

  addDesignForm: FormGroup;

  addBacklogForm: FormGroup;

  testEntry: any;

  activeIndex: number = 0;

  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  uploadedFiles: any[] = [];

  value: Date;

  newList: SelectItem[];

  maxCount: any;

  blmaxCount: any = this.designService.designList.length + 1;

  display: boolean;

  selectedProject: any;

  constructor(public designService: DesignService, public router: Router, public _location: Location, public fileUploadService: FileUploadService) {
    this.designService.designList = this.designService.selectedDesignInService.design_details;
    this.desginBacklog = this.designService.designList;
    //console.log(this.desginBacklog);
  }

  ngOnInit() {
    this.designPlanList = this.designService.loadDesigns().subscribe((responseData: any) => {
      this.designPlanList = responseData.body;
      this.maxCount = this.designPlanList.length;
    })

    this.selectedProject = this.designService.selectedProject;
    //console.log(this.selectedProject);

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
    //console.log(this.clickedonPhase);
  }

  showDialog() {
    this.display = true;
  }

  updateEdit() {
    this.testEntry = {
      "design_id": this.designService.selectedDesignInService.design_id,
      "project_id": this.designService.selectedDesignInService.project_id,
      "project_name": this.newProject_name,
      "project_lead": this.newProject_lead,
      "design_engineer": "Wolverine",
      "start_date": this.newStart_date_design,
      "end_date": this.newEnd_date_design,
      "status": "pending",
      "reference_id": this.designService.selectedDesignInService.reference_id,
      "created_by": "Wolverine",
      "created_date": "2019-11-26",
      "uploaded_by": "Wolverine",
      "uploaded_date": "2019-11-26",
      "design_details": this.desginBacklog
    }
    let data = JSON.stringify(this.testEntry);
    this.designService.updateDesigns(data).subscribe(() => {
      this.router.navigate(['/design-module']);
    })

  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.fileUploadService.uploadFile(file).subscribe((result) => {
        //console.log(result);
      })
      //console.log(this.uploadedFiles);
    }
  }

  onSubmitBacklog() {
    this.backlogEntry = {
      "design_id": this.maxCount + 1,
      "design_details_id": this.maxCount + 1,
      "project_id": this.maxCount + 1,
      "line_number": this.blmaxCount,
      "design_date": this.addBacklogForm.value.due_date,
      "design_phase": this.clickedonPhase,
      "assignee": "Wolverine",
      "file_type": "pdf",
      "reference_type": "abc",
      "file": "new.pdf",
      "due_date": this.addBacklogForm.value.due_date,
      "status": this.addBacklogForm.value.status,
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


