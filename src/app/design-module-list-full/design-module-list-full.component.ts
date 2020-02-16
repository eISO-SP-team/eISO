import { Component, OnInit } from '@angular/core';
import { DesignService } from "../shared/service/design.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-design-module-list-full',
  templateUrl: './design-module-list-full.component.html',
  styleUrls: ['./design-module-list-full.component.css']
})
export class DesignModuleListFullComponent implements OnInit {

  designList: any;

  planList = [];

  inputList = [];

  controlList = [];

  outputList = [];

  completeList = [];

  testList: any;

  index: any;


  constructor(public _location: Location, public designService: DesignService, public router: Router) {
    this.designService.getDesignListener()
      .subscribe(() => {
        this.testList = this.designService.loadDesigns().subscribe((responseData) => {
          this.designList = (<any>responseData).body;
          for (let i = 0; i < this.designList.length; i++) {
            if (this.designList[i].design_details[0].design_phase == "Design Plan") {
              this.planList.push(this.designList[i]);
            } else if (this.designList[i].design_details[0].design_phase == "Design Input") {
              this.inputList.push(this.designList[i]);
            } else if (this.designList[i].design_details[0].design_phase == "Design Control") {
              this.controlList.push(this.designList[i]);
            } else if (this.designList[i].design_details[0].design_phase == "Design Output") {
              this.outputList.push(this.designList[i]);
            } else {
              this.completeList.push(this.designList[i]);
            }
          }
        });
      });
  }

  ngOnInit() {

  }

  viewEnquiry(enquiry: any) {
    //console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.designService.selectedDesignInService = enquiry;
    this.router.navigate(['/designView', enquiry.id]);
  }


  deletePlan(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.planList.length; i++) {
        if (this.planList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.planList.splice(this.index, 1);
    });
  }

  deleteInput(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.planList.length; i++) {
        if (this.inputList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.inputList.splice(this.index, 1);
    });
  }

  deleteControl(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.planList.length; i++) {
        if (this.controlList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.controlList.splice(this.index, 1);
    });
  }

  deleteOutput(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.planList.length; i++) {
        if (this.outputList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.outputList.splice(this.index, 1);
    });
  }

  deleteComplete(enquiry) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.planList.length; i++) {
        if (this.completeList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.completeList.splice(this.index, 1);
    });
  }
}
