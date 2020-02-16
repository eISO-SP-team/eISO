import { Injectable, EventEmitter } from '@angular/core';
import { Notifications } from "../model/notifications.model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationsSubject: BehaviorSubject<Notifications[]>;

  notificationList: Notifications[] = [
    new Notifications("Mr Jack", "There are Quotations pending for approval", "2020/02/12", "Not Viewed"),
    new Notifications("Mr Jack", "There are Sales Order pending for approval", "2020/02/12", "Not Viewed"),
    new Notifications("Mr Jack", "Please check the uploaded Files", "2020/02/12", "Not Viewed"),
    new Notifications("Mr Jack", "Please check the uploaded Files", "2020/02/12", "Not Viewed"),
  ];

  constructor() {
    this.notificationsSubject = new BehaviorSubject<Notifications[]>(this.notificationList)
   }

  addNotification(newNotification: Notifications) {
    return new Promise(resolve => {
      //console.log("Retrieved enquiry");
      //console.log(newNotification);
      this.notificationList.unshift(newNotification);
      //console.log(this.notificationList);
      //basically, you update this listener with the new list, 
      //anyone that is subscribing to the enquiry will get the latest list
      this.notificationsSubject.next(this.notificationList);
      //console.log("triggered behaviour subject");
      resolve(true);
    });
  };

  getNotificationListener() {
    return this.notificationsSubject.asObservable();
  }

  loadNotification() {
    return this.notificationList.slice();
  }

}
