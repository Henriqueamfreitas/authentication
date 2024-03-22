import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TCreateDataPost } from '../../interfaces/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-create-form.component.html',
  styleUrl: './post-create-form.component.css'
})

export class PostCreateFormComponent {
  constructor(private postService: PostService){}

  postForm = new FormGroup({
    category: new FormControl<string | null>(null, [Validators.required]),
    title: new FormControl<string | null>(null, [Validators.required]),
    content: new FormControl<string | null>(null, [Validators.required]),
  })

  get errors(){
    return {
      category: this.postForm.get('category')?.errors,
      title: this.postForm.get('title')?.errors,
      content: this.postForm.get('content')?.errors,
    }
  }

  onSubmit(){
    const data = this.postForm.value as TCreateDataPost
    this.postService.create(data)
    this.postForm.reset()
  }
}
