import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../Services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Post } from '../post/post';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
	id: '';
	currentUrl: any;
	post: Post;
	postTitle = '';
  postContent = '';
  postImgUrl = '';

  constructor(
  	private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  	this.currentUrl = this.activatedRoute.snapshot.params;
    console.log(this.currentUrl);

    // this.postService.getPost(this.currentUrl.id).subscribe(data => {
    // 	this.post = {
    //       title: this.post.postTitle, 
    //       body: this.post.postContent, 
    //       author: this.post.postAuthor, 
    //       img: this.post.postImgUrl
    //     }
    // }, error => {
    // 	this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000});
    // });

    }

    deletePost() {
    	this.postService.deletePost(this.currentUrl.id).subscribe(data => {
    		this.flashMessage.show('Blog Deleted Successfully', {cssClass: 'alert-success', timeout: 3000});
    		this.router.navigate(['/blog-preview']);
    	},
    	error => {
    		this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000});
    	});
    }

}
