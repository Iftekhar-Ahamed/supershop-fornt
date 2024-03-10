import { Injectable, Signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotificationReceivedComponent } from './Component/notification-received/notification-received.component';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RealtimeClientService {
  private hubConnection: signalR.HubConnection;
  private notificationSubject = new Subject<string>();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44330/notificationHub')
      .withAutomaticReconnect()
      .build();
    this.hubConnection.onreconnecting(error => {
      console.log('SignalR reconnecting:', error);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log('SignalR reconnected. Connection ID:', connectionId);
    });

    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch(err => console.error('Error connecting to SignalR hub:', err));

    this.hubConnection.on('broadcastMessage', (notification: string) => {
      alert(notification);
      this.notificationSubject.next(notification);
    });
  }
  getNotificationObservable() {
    return this.notificationSubject.asObservable();
  }
}

