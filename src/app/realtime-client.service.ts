import { Injectable, Signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class RealtimeClientService {
  private hubConnection: signalR.HubConnection;
  notificationReceived: any;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44330/notificationHub')
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
          return 1 * 10000; // Set a longer reconnect interval
        }
      })
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
      // Check if notificationReceived is defined before calling addNotification
      if (this.notificationReceived) {
        this.notificationReceived.addNotification(notification);
      }
    });
  }
}

