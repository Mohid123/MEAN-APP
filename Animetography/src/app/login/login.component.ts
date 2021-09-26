import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { expand } from '../animations/app.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@expand]': 'true',
    'style': 'display: block;'
  },
  animations: [
  expand()
  ]
})
export class LoginComponent implements OnInit {
	checked = true;
	username: string;
	password: string;

  constructor(
  	private authService: AuthService,
  	private flashMessage: FlashMessagesService,
  	private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
  	const user = {
  		username: this.username,
  		password: this.password
  	}

  	if(this.username && this.password) {
  		this.authService.authenticateUser(user).subscribe(data => {
  			if(data.success) {
	  			this.authService.storeUserData(data.token, data.user);
	  			this.flashMessage.show('You are logged in', {cssClass: 'alert-success', timeout: 3000});
	  			this.router.navigate(['blog-preview']);
	  		} else {
	  			this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
	  			this.router.navigate(['login']);
	  		}
	  	});
  	} else {
  		this.flashMessage.show('Please fill in the form', {cssClass: 'alert-danger', timeout: 3000});
	  	this.router.navigate(['login']);
	  }
	}
}
