import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUserReturn, TUserCreate, TUserLogin, TUserReturn } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserRequest {
  private BASE_URL = "https://blog-fake-api.onrender.com"

  constructor(private http: HttpClient) { }

  register(formData: TUserCreate){
    return this.http.post<TUserReturn>(`${this.BASE_URL}/users`, formData)
  }

  login(loginFormData: TUserLogin){
    return this.http.post<ILoginUserReturn>(`${this.BASE_URL}/login`, loginFormData)
  }

  getUser(){
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    if(token && userId){
      const parsedToken = JSON.parse(token);
      const parsedUserId = JSON.parse(userId);

      return this.http.get<TUserReturn>(`${this.BASE_URL}/users/${parsedUserId}`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`
        }
      })
    } else {
      return null;
    }
  }
}
