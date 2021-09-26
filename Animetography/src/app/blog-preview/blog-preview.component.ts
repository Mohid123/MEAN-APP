import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../Services/post.service";
import { AuthService } from "../Services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSpinnerService } from "ngx-spinner";
import * as Editor from '../ckeditor5/build/ckeditor';
import { Observable, Subscription } from 'rxjs';
import { expand } from '../animations/app.animation';

@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
  host: {
    '[@expand]': 'true',
    'style': 'display: block;'
  },
  animations: [
  expand()
  ]
})
export class BlogPreviewComponent implements OnInit {

  Loading = false;
  closeResult = '';
  id: '';
  postTitle = '';
  postContent = '';
  postImgUrl = '';
  postAuthor: string;
  searchText: string;
  post: any;
  currentUrl: any;
  public editor = Editor;
  posts: any;
  username;

  slides = [{'image': '/assets/direc.png', 'text': 'Direction'},
  {'image': '/assets/direc.jpg', 'text': 'Lighting'},
  {'image': '/assets/color.png', 'text': 'Color'},
  {'image': '/assets/falls.png', 'text': 'Photography'},
  {'image': '/assets/symbolic.png', 'text': 'Visual Motifs'},
  {'image': '/assets/blockA.png', 'text': 'Blocking and Staging'}];

  constructor(private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private flashMessage: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.spinner.show();
    this.postService.getPosts().subscribe(
      data => {
        //console.log(data);
        this.posts = data;
        this.spinner.hide();
      },
      err => {
        console.log(err);
        return false;
      });


    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });

    // (<any>window).twttr.widgets.load();

  }


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
