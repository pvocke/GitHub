import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Post } from "./post.model";


const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number,currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
      .pipe(
        map(postData => {
          return { posts: postData.posts.map(post => {
            return {
              name: post.name,
              email: post.email,
              date: post.date,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          }), maxPosts: postData.maxPosts}
        })
      )
      .subscribe(transformedPostData => {
        console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts], 
          postCount: transformedPostData.maxPosts
        });
      });
      
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      creator: string; _id: string, name: string, email:string, date: string, content: string, imagePath: string 
}>(
      BACKEND_URL + id
    );
  }

  addPost(name: string, email: string, date: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("name", name);
    postData.append("email", email);
    postData.append("date", date);
    postData.append("content", content);
    postData.append("image", image, name);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
           this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, name: string, email: string, date: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("name", name);
      postData.append("email", email);
      postData.append("date", date);
      postData.append("content", content);
      postData.append("image", image, name);
    } else {
      postData = {
        id: id,
        name: name,
        email: email,
        date: date,
        content: content,
        imagePath: image
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http
      .delete(BACKEND_URL + postId);
  }
}
