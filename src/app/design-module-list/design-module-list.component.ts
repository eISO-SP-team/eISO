import { Component, OnInit } from '@angular/core';
import { DesignService } from "../shared/service/design.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-design-module-list',
  templateUrl: './design-module-list.component.html',
  styleUrls: ['./design-module-list.component.css']
})
export class DesignModuleListComponent implements OnInit {

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

  viewMore(){
    this.router.navigate(['/designList']);
  }

  viewEnquiry(enquiry: any) {
    //console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.designService.selectedDesignInService = enquiry;
    this.router.navigate(['/designView', enquiry.id]);
  }

  deleteEnquiry(enquiry: { id: string; }) {
    //console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.designList.length; i++) {
        if (this.designList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.designList.splice(this.index, 1);
      //console.log('Design with id: ' + enquiry.id + ' has been deleted');
    });

  }

}
