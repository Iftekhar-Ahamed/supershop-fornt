import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseUrl = 'https://localhost:44330';

  constructor(private http: HttpClient, private data: UserDataService) { }

  logIn(url: string): Observable<any> {
    const apiUrl = this.baseUrl + url;
    return this.http.get<any>(apiUrl);
  }
  get(url: string): Observable<any> {
    const apiUrl = this.baseUrl + url;
    return this.http.get<any>(apiUrl, this.RequestOptions());
  }
  post(taskPayload: any, url: string): Observable<any> {
    const apiUrl = this.baseUrl + url;
    return this.http.post<any>(apiUrl, taskPayload, this.RequestOptions());
  }
  private RequestOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.data.userInfo.userAccessToken
    });
    return { headers: headers };
  }
}
