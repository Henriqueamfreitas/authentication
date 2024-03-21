import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TUserLogin } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private userService: UserService){}

  loginForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  })

  onSubmit(){
    const loginData = this.loginForm.value as TUserLogin
    this.userService.login(loginData)
  }
}
