import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as Editor from '../ckeditor5/build/ckeditor';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})

export class BlogAddComponent implements OnInit {

    postTitle: '';
    postAuthor: '';
    postContent: '';
    postImgUrl: string;
    post: any[] = [];
    postForm: FormGroup;
    public editor = Editor;
    config;

  constructor(private postService: PostService,
  	private formBuilder: FormBuilder,
  	private router: Router,
  	private flashMessage: FlashMessagesService) {
  }

  ngOnInit(): void {

    this.postForm = new FormGroup({
      postTitle: new FormControl(null),
      postAuthor: new FormControl(null),
      postContent: new FormControl(null),
      postImgUrl: new FormControl(null)
    });

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


  onBlogSubmit() {
    this.postService.addPost(this.postForm.value).subscribe(
        data => {     
            this.flashMessage.show('Blog Submitted Successfully', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/blog-preview']);
        },
        error => {
            this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
    );
  }

  imagePluginFactory(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
      return new CloudinaryUnsigned( loader, 'drgn2zip5', "google_tagging", [ 160, 500, 1000, 1052 ]);
    };
  }

}
