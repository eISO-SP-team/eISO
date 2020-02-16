import { Component, OnInit } from '@angular/core';
import { ProcesscontrolService } from "../shared/service/processcontrol.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DesignService } from "../shared/service/design.service";

@Component({
  selector: 'app-design-module-projects',
  templateUrl: './design-module-projects.component.html',
  styleUrls: ['./design-module-projects.component.css']
})
export class DesignModuleProjectsComponent implements OnInit {

  projectList: any;

  testList: any;

  index: any;

  constructor(public _location: Location, public processControlService: ProcesscontrolService, public router: Router, public designService: DesignService) { }

  ngOnInit() {
    this.testList = this.processControlService.loadProcesscontrols().subscribe((responseData) => {
      this.projectList = (<any>responseData).body;
    });
  }

  selectEnquiry(enquiry: any) {
    this.designService.selectedProject = enquiry;
    //console.log(enquiry);
    this.router.navigate(['/designCreate'])
  }

}
