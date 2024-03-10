import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RealtimeClientService } from '../../realtime-client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-received',
  templateUrl: './notification-received.component.html',
  styleUrl: './notification-received.component.css'
})

export class NotificationReceivedComponent {

  private notificationSubscription: Subscription;

  constructor(private realtimeClientService: RealtimeClientService) {
    this.notificationSubscription = this.realtimeClientService
      .getNotificationObservable()
      .subscribe(notification => {
        console.log(notification);
        this.openSnackBar(notification, 3);
      });
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  openSnackBar(notification: string, duration: number): void {
    // Implement your snackbar logic here
    console.log('Notification Received:', notification);
  }

}