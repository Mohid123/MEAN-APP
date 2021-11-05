import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  	private toast: ToastrService,
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
	  			this.toast.success('Log In', 'Successfully Logged In!');
	  			this.router.navigate(['blog-preview']);
	  		} else {
	  			this.toast.warning('Log In', 'Login Failed. Something went wrong!');
	  			this.router.navigate(['login']);
	  		}
	  	});
  	} else {
  		this.toast.error('Log In', 'Please Fill in All fields!');
	  	this.router.navigate(['login']);
	  }
	}
}
