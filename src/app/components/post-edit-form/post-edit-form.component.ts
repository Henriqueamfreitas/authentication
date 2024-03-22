import { Component, effect } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TUpdatePost } from '../../interfaces/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-edit-form.component.html',
  styleUrl: './post-edit-form.component.css'
})
export class PostEditFormComponent {
  constructor(private postService: PostService){
    effect(() => {
      this.postEditForm.setValue({
        category: this.editingPost?.category as string,
        title: this.editingPost?.title as string,
        content: this.editingPost?.content as string,
      })
    })
  }

  get editingPost(){
    return this.postService.getEditingPost()
  }

  postEditForm = new FormGroup({
    category: new FormControl<string | null>(this.editingPost?.category as string, [Validators.required]),
    title: new FormControl<string | null>(null, [Validators.required]),
    content: new FormControl<string | null>(null, [Validators.required]),
  })

  get errors(){
    return {
      category: this.postEditForm.get('category')?.errors,
      title: this.postEditForm.get('title')?.errors,
      content: this.postEditForm.get('content')?.errors,
    }
  }


  onSubmit(){
    const data = this.postEditForm.value as TUpdatePost
    this.postService.update(data)
    this.postService.setEditingPost(null)
  }
}
