import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TUserCreate } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  constructor(private userService: UserService){}

  registerForm = new FormGroup({
    name: new FormControl(<string | null>(null), [Validators.required]),
    email: new FormControl(<string | null>(null), [Validators.required, Validators.email]),
    password: new FormControl(<string | null>(null), [Validators.required, Validators.minLength(8)]),
    job: new FormControl(<string | null>(null), [Validators.required]),
  })

  get errors(){
    return {
      name: this.registerForm.get('name')?.errors,
      email: this.registerForm.get('email')?.errors,
      password: this.registerForm.get('password')?.errors,
      job: this.registerForm.get('job')?.errors,
    }
  }

  onSubmit(){
    if(this.registerForm.status==="INVALID"){
      return alert("Preencha todos os campos")
    }
    const data = this.registerForm.value as TUserCreate
    this.userService.register(data)
    this.registerForm.reset()
  }
}
