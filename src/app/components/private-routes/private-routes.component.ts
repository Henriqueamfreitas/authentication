import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private-routes',
  standalone: true,
  imports: [CommonModule, PrivateRoutesComponent],
  templateUrl: './private-routes.component.html',
  styleUrl: './private-routes.component.css'
})
export class PrivateRoutesComponent {
  constructor(private userService: UserService, private router: Router){
    if(!this.user) this.router.navigateByUrl('/')
  }

  get user(){
    return this.userService.getUser()
  }

}
