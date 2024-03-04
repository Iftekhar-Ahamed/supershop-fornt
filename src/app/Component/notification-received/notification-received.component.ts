import { Component, OnInit } from '@angular/core';
import { RealtimeClientService } from '../../realtime-client.service';

@Component({
  selector: 'app-notification-received',
  templateUrl: './notification-received.component.html',
  styleUrl: './notification-received.component.css'
})

export class NotificationReceivedComponent implements OnInit {
  latestNotification: string | null = null;

  constructor(private notificationService: RealtimeClientService) { }

  ngOnInit(): void {
    this.notificationService.notificationReceived.subscribe((message: string) => {
      this.latestNotification = message;

      // Clear the notification after a certain time (e.g., 5 seconds)
      setTimeout(() => {
        this.latestNotification = null;
      }, 5000);
    });
  }
}