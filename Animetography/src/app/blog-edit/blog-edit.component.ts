import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../Services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Editor from '../ckeditor5/build/ckeditor';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
	id: '';
	currentUrl: any;
	post: any;
	postForm: FormGroup;
	postTitle = '';
  postContent = '';
  postImgUrl = '';
  postAuthor = '';
  public editor = Editor;
  config;

  constructor(
  	private location: Location,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {

  	this.currentUrl = this.activatedRoute.snapshot.params;
    //console.log(this.currentUrl);
  	this.getPost(this.currentUrl.id);
  	//console.log(this.currentUrl);
  	this.postForm = this.formBuilder.group({
      postTitle : [null],
      postContent : [null],
      postImgUrl : [null],
      postAuthor : [null]
    });
  	// this.postService.getPost(this.currentUrl.id).subscribe(
   //    data => {
   //      console.log(data);
   //      this.post = data;
   //    },
   //    err => {
   //      console.log(err);
   //      return false;
   //    }
   //  );

   this.config = {
      //extraPlugins: [ this.imagePluginFactory ],
      toolbar: {
        styles: [
            'alignLeft', 'alignCenter', 'alignRight', 'full', 'side'
            ],
        items: [
          'heading',
          '|',
          'fontSize',
          '|',
          'bold',
          'italic',
          'underline',
          'highlight',
          '|',
          'alignment',
          '|',
          'numberedList',
          'bulletedList',
          '|',
          'indent',
          'outdent',
          '|',
          'todoList',
          'link',
          'blockQuote',
          'imageUpload',
          'insertTable',
          '|',
          'undo',
          'redo'
        ]
      },
      language: 'en',
      image: {
        resizeOptions: [
            {
                name: 'resizeImage:original',
                value: null,
                icon: 'original'
            },
            {
                name: 'resizeImage:50',
                value: '50',
                icon: 'medium'
            },
            {
                name: 'resizeImage:75',
                value: '75',
                icon: 'large'
            }
        ],
        toolbar: [
          'resizeImage',
          '|',
          'imageTextAlternative',
          'resizeImage:50',
          'resizeImage:75',
          'resizeImage:original',
          'insertImage'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      }
    }

  }

  getPost(id: any) {
    this.postService.getPost(id).subscribe((data: any) => {
      this.id = data._id;
      //console.log(this.id);
      this.postForm.setValue({
        postTitle: data.postTitle,
        postContent: data.postContent,
        postImgUrl: data.postImgUrl,
        postAuthor: data.postAuthor
      });
    });
  }

  updateBlogSubmit() {
  	this.postService.updatePost(this.id, this.postForm.value).subscribe(data => {
  		const id = this.id;
  		this.flashMessage.show('Blog Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/blog-preview']);
  	},
  	error => {
  		this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000});
  	});
  }

}
