import { Component, OnInit } from '@angular/core';
import { DesignService } from "../shared/service/design.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-design-module',
  templateUrl: './design-module.component.html',
  styleUrls: ['./design-module.component.css']
})
export class DesignModuleComponent implements OnInit {

  designList: any;

  testList: any;

  index: any;


  constructor(public _location: Location, public designService: DesignService, public router: Router) {

  }

  ngOnInit() {
    this.testList = this.designService.loadDesigns().subscribe((responseData) => {
      this.designList = (<any>responseData).body;
    });
  }

  viewEnquiry(enquiry: any) {
    console.log("In onViewDetail......" + JSON.stringify(enquiry));
    this.designService.selectedDesignInService = enquiry;
    this.router.navigate(['/designView', enquiry.id]);
  }

  deleteEnquiry(enquiry: { id: string; }) {
    console.log("Delete this enquiry......" + JSON.stringify(enquiry.id));
    this.designService.deleteDesigns(enquiry.id).subscribe(() => {
      for (let i = 0; i < this.designList.length; i++) {
        if (this.designList[i].id == enquiry.id) {
          this.index = i;
          break;
        }
      }
      this.designList.splice(this.index, 1);
      console.log('Design with id: ' + enquiry.id + ' has been deleted');
    });

  }

}
