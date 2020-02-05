import { Component, OnInit } from '@angular/core';
import { ProcesscontrolService } from "../shared/service/processcontrol.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-process-control-module',
  templateUrl: './process-control-module.component.html',
  styleUrls: ['./process-control-module.component.css']
})
export class ProcessControlModuleComponent implements OnInit {

  projectList: any;

  testList: any;

  index: any;

  constructor(public _location: Location, public processControlService: ProcesscontrolService, public router: Router) {

  }
  ngOnInit() {
    this.testList = this.processControlService.loadProcesscontrols().subscribe((responseData) => {
      this.projectList = (<any>responseData).body;
    });
  }

  viewEnquiry(enquiry: any) {
    console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.processControlService.selectedProcesscontrolInService = enquiry;
    this.router.navigate(['/processc-control-view', enquiry.id]);
  }

  deleteEnquiry(enquiry: { id: string; }) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.processControlService.deleteProcesscontrols(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.projectList.splice(this.index, 1);
      console.log('Process Control with id: ' + enquiry.id + ' has been deleted');
    });

  }
}
