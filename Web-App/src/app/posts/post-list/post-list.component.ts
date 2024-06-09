import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Post } from "../post.model"; 

import { PostsService } from "../post.service";
import { AuthService } from "src/app/auth/auth.service";


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title: 'First Post', content: 'This is the first post\'s content'},
    //     {title: 'Second Post', content: 'This is the Second post\'s content'},
    //     {title: 'Third Post', content: 'This is the third post\'s content'},
        
    // ];


   isLoading = false; 
   posts: Post[] = [];
   totalPost = 10;
   postsPerPage = 10;
   currentPage = 1;
   pageSizeOption = [1, 2, 5, 10];
   userIsAuthenticated = false;
   userId: string;
   private postsSub: Subscription;
   private authStatusSub: Subscription;
   

    constructor(public postsService: PostsService, private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[]; postCount: number}) => {
            this.isLoading = false;
            this.totalPost = postData.postCount;
            this.posts = postData.posts;
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAthenticated => {
            this.userIsAuthenticated = isAthenticated;
            this.userId = this.authService.getUserId();           
        });
    }

    onChangePage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postsService.deletePost(postId).subscribe(() => {
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        }, ()=> {
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }
}