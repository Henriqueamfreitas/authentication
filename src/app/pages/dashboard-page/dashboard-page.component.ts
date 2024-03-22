import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { PrivateRoutesComponent } from '../../components/private-routes/private-routes.component';
import { PostCreateFormComponent } from '../../components/post-create-form/post-create-form.component';
import { PostService } from '../../services/post.service';
import { PostEditFormComponent } from '../../components/post-edit-form/post-edit-form.component';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, PrivateRoutesComponent, PostCreateFormComponent, PostEditFormComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  constructor(private userService: UserService, private postService: PostService){}

  get user(){
    return this.userService.getUser()
  }

  get postList(){
    return this.postService.getPosts()
  }

  get editingPost(){
    return this.postService.getEditingPost()
  }

  handleEdit(post: IPost){
    return this.postService.setEditingPost(post)
  }

  handleDelete(postId: number){
    this.postService.delete(postId)
  }

  handleLogout(){
    this.userService.logout()
  }
}
