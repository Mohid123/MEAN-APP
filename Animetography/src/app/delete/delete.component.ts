import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../Services/post.service';
import { Toast, ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService) { }

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
    		this.toast.success('Post Deleted Successfully', 'Delete Post');
    		this.router.navigate(['/blog-preview']);
    	},
    	error => {
    		this.toast.error('Something Went Wrong', 'Delete Post');
    	});
    }

}
