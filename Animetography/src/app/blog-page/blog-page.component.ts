import { Component, OnInit, AfterViewInit } from "@angular/core";
import { PostService } from "../Services/post.service";
import { AuthService } from "../Services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSpinnerService } from "ngx-spinner";
import * as Editor from '../ckeditor5/build/ckeditor';
import { Post } from '../post/post';
// import { flyinout } from '../animations/app.animation';

@Component({
  selector: "app-blog-page",
  templateUrl: "./blog-page.component.html",
  styleUrls: ["./blog-page.component.scss"]
  // host: {
  //   '[@flyinout]': 'true',
  //   'style': 'display: block;'
  // },
  // animations: [
  // flyinout()
  // ]
})
export class BlogPageComponent implements OnInit, AfterViewInit {
  Loading = false;
  closeResult = '';
  searchText;

  post: Post = {
    id: '',
    postTitle: '',
    postContent: '',
    postImgUrl: '',
    postAuthor: '',
    created: null,
    updated: null
};

  currentUrl: any;
  public editor = Editor;
  posts: any;
  username: any;

  constructor(private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private flashMessage: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService) {
  }

  ngAfterViewInit():void {
    
    this.spinner.show();

     setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  ngOnInit(): void {
    this.getPostbyId(this.activatedRoute.snapshot.params.id);

    // this.postService.getPosts().subscribe(
    //   data => {
    //     //console.log(data);
    //     this.spinner.show();
    //     this.posts = data;
    //     this.spinner.hide();
    //   },
    //   err => {
    //     console.log(err);
    //     return false;
    //   });


    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });

  }

  getPostbyId(id: any) {
    this.postService.getPost(id).subscribe((data: any) => {
       this.post = data;
       this.post.id = data._id;
       window.scrollTo(0, 0);
       console.log(this.post);
      });
  }



// FOR MODAL
open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}