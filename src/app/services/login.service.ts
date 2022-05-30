import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(environment.appURL + `/login`, user);
  }

  logout(): Observable<any> {
    return this.http.post<any>(environment.appURL + `/log-out`, {});
  }

}
