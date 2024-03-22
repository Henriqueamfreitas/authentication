import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TCreateDataPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-create-form.component.html',
  styleUrl: './post-create-form.component.css'
})

export class PostCreateFormComponent {
  constructor(private postService: PostService){}

  postForm = new FormGroup({
    category: new FormControl<string | null>(null),
    title: new FormControl<string | null>(null),
    content: new FormControl<string | null>(null),
  })

  onSubmit(){
    const data = this.postForm.value as TCreateDataPost
    this.postService.create(data)
    this.postForm.reset()
  }
}
