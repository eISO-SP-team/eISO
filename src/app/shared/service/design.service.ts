import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DesignService {


    designSubject: BehaviorSubject<any[]>;

    selectedProject: any;

    selectedDesignInService: any;

    designList: any[] = [

    ];


    constructor(public http: HttpClient) {
        this.designSubject = new BehaviorSubject<any[]>(this.designList);
    }


    getDesignListener() {
        return this.designSubject.asObservable();
    }

    addDesigns(designs) {
        this.designList.unshift(designs);
        this.designSubject.next(this.designList);
        return this.http.post('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/design', designs, {
        });
    }

    loadDesigns() {
        return this.http.get('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/design');
    }
    updateDesigns(enquiryId, newInfo) {
        return this.http.put('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/design/' + enquiryId, newInfo)
    }

    deleteDesigns(enquiryId) {
        console.log('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/design/' + enquiryId);
        return this.http.delete('https://o0wgx4jm6g.execute-api.ap-southeast-1.amazonaws.com/dev/design/' + enquiryId)
    }
}

