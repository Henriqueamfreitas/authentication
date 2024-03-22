import { Component, effect } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TUpdatePost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    category: new FormControl<string | null>(this.editingPost?.category as string),
    title: new FormControl<string | null>(null),
    content: new FormControl<string | null>(null),
  })

  onSubmit(){
    const data = this.postEditForm.value as TUpdatePost
    this.postService.update(data)
    this.postService.setEditingPost(null)
  }
}
