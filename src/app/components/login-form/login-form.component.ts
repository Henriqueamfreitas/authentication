import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TUserLogin } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private userService: UserService){}

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  })

  get errors(){
    return {
      email: this.loginForm.get('email')?.errors,
      password: this.loginForm.get('password')?.errors,
    }
  }

  onSubmit(){
    const loginData = this.loginForm.value as TUserLogin
    this.userService.login(loginData)
  }
}
