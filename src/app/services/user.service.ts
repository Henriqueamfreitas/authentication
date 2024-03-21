import { Injectable, signal } from "@angular/core";
import { UserRequest } from "../api/user.request";
import { TUserCreate, TUserLogin, TUserReturn } from "../interfaces/user.interface";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { publicRoutes } from "../app.routes";

@Injectable({ providedIn: 'root' })
export class UserService{
  readonly userSignal = signal<TUserReturn | null>(null)

  constructor(private userRequest: UserRequest, private router: Router) {
    const pathname = window.location.pathname
    this.userRequest.getUser()?.subscribe({
      next: (data) => {
        this.userSignal.set(data);
        if(publicRoutes.includes(pathname)){
          this.router.navigateByUrl("/dashboard");
        } else{
          this.router.navigateByUrl(pathname);
        }
      },
      error: (error) => {
        console.log(error);
        this.logout();
      },
    });
  }

  getUser(){
    return this.userSignal()
  }

  register(formData: TUserCreate){
    this.userRequest.register(formData).subscribe({
      next: () => {
        alert("Cadastro realizado com sucesso.")
        this.router.navigateByUrl('/')
      },
      error: (error) => {
        if(error instanceof HttpErrorResponse){
          alert(error.error)
        }
        console.log(error)
      }
    })
  }

  login(loginFormData: TUserLogin){
    this.userRequest.login(loginFormData).subscribe({
      next: (data) => {
        localStorage.setItem("@TOKEN", JSON.stringify(data.accessToken));
        localStorage.setItem("@USERID", JSON.stringify(data.user.id));
        this.userSignal.set(data.user)
        this.router.navigateByUrl('/dashboard')
      },
      error: (error) => {
        if(error instanceof HttpErrorResponse){
          alert(error.error)
        }
        console.log(error)
      }
    })
  }

  logout(){
    this.userSignal.set(null)
    localStorage.removeItem("@TOKEN")
    localStorage.removeItem("@USERID")
    this.router.navigateByUrl('/')
  }
}
