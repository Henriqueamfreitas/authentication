import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, TCreatePost, TUpdatePost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostRequest {
  private BASE_URL = "https://blog-fake-api.onrender.com"

  constructor(private http: HttpClient) { }

  create(formData: TCreatePost){
    const token = localStorage.getItem("@TOKEN")
    if(token){
      const parsedToken = JSON.parse(token)

      return this.http.post<IPost>(`${this.BASE_URL}/news`, formData, {
        headers: {
          Authorization: `Bearer ${parsedToken}`
        }
      })
    } else{
      return null
    }
  }

  getPosts(){
    return this.http.get<IPost[]>(`${this.BASE_URL}/news`)
  }

  update(formData: TUpdatePost, postId: number) {
    const token = localStorage.getItem("@TOKEN")
    if(token){
      const parsedToken = JSON.parse(token)

      return this.http.patch<IPost>(`${this.BASE_URL}/news/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${parsedToken}`
        }
      })
    } else{
      return null
    }
  }

  delete(postId: number) {
    const token = localStorage.getItem("@TOKEN")
    if(token){
      const parsedToken = JSON.parse(token)

      return this.http.delete(`${this.BASE_URL}/news/${postId}`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`
        }
      })
    } else{
      return null
    }
  }

}
