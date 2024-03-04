import { Injectable, Signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class RealtimeClientService {
  private hubConnection: signalR.HubConnection;
  notificationReceived: any;
  constructor() {
    console.log("In RealtimeClientService")
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https:/localhost:44330/notificationHub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch(err => console.error('Error connecting to SignalR hub:', err));
    this.hubConnection.on('broadcastMessage', (notification: string) => {
      this.notificationReceived.addNotification(notification);
    });
  }
}
