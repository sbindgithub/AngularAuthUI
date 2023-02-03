import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  header: HttpHeaders;
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders()
      .set("Accept", "application/json, text/plain")
      .set("Content-Type","application/json, text/plain")
      ;
  }

  private baseUrl:string="https://localhost:7113/api/User/"
  //constructor(private http : HttpClient) { }

  // signUp(userObj:any){
  //   return this.http.post<any>('${this.baseUrl}register',userObj)
  // }

  signUp(userObj:any){
    return this.http.post<any>('https://localhost:7113/api/User/Register',userObj)
  }

  // login(loginObj:any){
  //   return this.http.post<any>('https://localhost:7113/api/User/authenticate',loginObj, { headers: this.header })
  // }

  login(loginObj:any){
    return this.http.post<any>('https://localhost:7113/api/User/Authenticate',loginObj)
  }

}
