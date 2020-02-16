import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "../shared/service/notifications.service";
import { Notifications } from "../shared/model/notifications.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationsList: Notifications[];

  constructor(public notificationsService: NotificationsService) {
    this.notificationsService.getNotificationListener()
      .subscribe(newList => {
        //console.log("listener triggered");
        //console.log(newList);
        this.notificationsList = this.notificationsService.loadNotification();
      })
  }

  ngOnInit() {
  }

}
