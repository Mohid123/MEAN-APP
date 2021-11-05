import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidateService } from '../Services/validate.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
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
export class RegisterComponent implements OnInit, AfterViewInit {
	checked = true;

	name: string;
	username: string;
	email: string;
	password: string;

  constructor(private validateService: ValidateService,
    //private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const text = document.querySelector('.form-control');
    const btn = document.querySelector('.get');
    const form = document.querySelector('.text-center');
    anime.timeline({loop: false})
    .add({
      targets: '.form-control',
      translateX: [800, 0],
      duration: 3000,
      delay: anime.stagger(300),
      easing: 'easeInOutQuad' 
    });

    anime.timeline({loop: false})
    .add({
      targets: '.get',
      translateX: [-800, 0],
      duration: 3000,
      delay: anime.stagger(300),
      easing: 'easeInOutQuad' 
    });

    anime.timeline({loop: false})
    .add({
      targets: '.text-center',
      translateY: [-800, 0],
      duration: 1000,
      easing: 'easeInOutQuad' 
    });
  }

  ngAfterViewInit(): void {

    const logo = document.querySelector('.fa-user-plus');
    anime.timeline({loop: false})
    .add({
      targets: '.fa-user-plus',
      scaleX: [
        { value: 1.6, duration: 800, delay: 500, easing: 'easeOutExpo' },
        { value: 1, duration: 900 },
        { value: 1.6, duration: 800, delay: 500, easing: 'easeOutExpo' },
        { value: 1, duration: 900 }
      ],
      scaleY: [
        // { value: 1, duration: 500 },
        { value: 1.6, duration: 350, delay: 2000, easing: 'easeOutExpo' },
        { value: 1, duration: 450 },
        { value: 1.6, duration: 350, delay: 2000, easing: 'easeOutExpo' },
        { value: 1, duration: 450 }
      ],
      easing: 'easeOutElastic(1, .8)',
      loop: true
    });
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
