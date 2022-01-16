import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidateService } from '../Services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { expand } from '../animations/app.animation';
declare var anime: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@expand]': 'true',
    'style': 'display: block;'
  },
  animations: [
  expand()
  ]
})
export class RegisterComponent implements OnInit {
	checked = true;

	name: string;
	username: string;
	email: string;
	password: string;

  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
  	const user = {
  		name: this.name,
  		username: this.username,
  		email: this.email,
  		password: this.password
  	}

  	//Required fields
  	if(!this.validateService.validateRegister(user)) {
  		this.toast.error('Please Fill in all Fields', 'Register');
  		return false;
  	}

  	//Required email validate
  	if(!this.validateService.validateEmail(user.email)) {
  		this.toast.error('A VALID Email ID is Required', 'Register');
  		return false;
  	}

    //Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.toast.success('You are now Registered and can Log In', 'Register');
        this.router.navigate(['/login']);
      } else {
        this.toast.warning('Something Went Wrong', 'Register');
        this.router.navigate(['/register']);
      }
    });
  }
}
