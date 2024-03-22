import { Injectable, signal } from "@angular/core";
import { PostRequest } from "../api/post.request";
import { IPost, TCreateDataPost, TCreatePost, TUpdatePost } from "../interfaces/post.interface";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class PostService{
  readonly postListSignal = signal<IPost[]>([])
  readonly editingPostSignal = signal<IPost | null>(null)

  constructor(private postRequest: PostRequest, private userService: UserService){
    this.postRequest.getPosts().subscribe((data) => {
      this.postListSignal.set(data)
    })
  }

  create(formData: TCreateDataPost){
    const user = this.userService.getUser()

    if(user){
      const requestData = { ...formData, author: user.name }
      this.postRequest.create(requestData)?.subscribe((data) => {
        return this.postListSignal.update((postList) => [...postList, data])
      })
    }
  }

  getPosts(){
    return this.postListSignal()
  }

  getEditingPost(){
    return this.editingPostSignal()
  }

  setEditingPost(value: IPost | null){
    this.editingPostSignal.set(value)
  }

  update(formData: TUpdatePost){
    const editingPost = this.editingPostSignal()
    if(editingPost){
      const postId = editingPost.id
      this.postRequest.update(formData, postId)?.subscribe((data) => {
        this.postListSignal.update((postList) => {
          return postList.map((post) => {
            if(post.id === postId){
              return data;
            } else{
              return post;
            }
          });
        });
      });
    }
  }

  delete(postId: number){
    this.postRequest.delete(postId)?.subscribe(() => {
      return this.postListSignal.update((postList) => postList.filter(post => post.id !== postId))
    })
  }
}
