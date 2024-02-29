import { Injectable } from '@angular/core';
interface UserInfo {
  id: number;
  userFullName: string;
  userName: string;
  userTypeId: number;
  userAccessToken: string;
  userRefreshToken: string;
  connectionId: string;
  isActive: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userInfo: UserInfo = {
    id: 0,
    userFullName: "",
    userTypeId: 0,
    userAccessToken: "",
    userRefreshToken: "",
    isActive: true,
    connectionId: "",
    userName: ""
  }
  private localStorageKey = 'todoAppData';
  constructor() {
    this.userInfo = this.getData();
  }
  setData(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userInfo));
  }
  getData(): any {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : null;
  }
}
