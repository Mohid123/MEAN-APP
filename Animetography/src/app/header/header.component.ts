import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { PostService } from "../Services/post.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var anime: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public isMenuCollapsed = true;
  username;
  postAuthor: string;
  posts: any;

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
  	const nav = document.querySelector('.navbar');
  	anime.timeline({loop: false})
  	.add({
  		targets: '.navbar',
  		translateY: [-300, 0],
  		easing: 'easeInOutQuad',
  		duration: 1500
  	});

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['login']);
    return false;
  }

}
