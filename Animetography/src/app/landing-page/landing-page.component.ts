import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../Services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { flyinout } from '../animations/app.animation';
declare var anime: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  host: {
    '[@flyinout]': 'true',
    'style': 'display: block;'
  },
  animations: [
  flyinout()
  ]
})
export class LandingPageComponent implements OnInit {
  closeResult = '';

  constructor(public dialog: MatDialog, public authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {

  	const text = document.querySelector('.wel');
  	text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  	anime.timeline({loop: false})
  	.add({
  		targets: '.wel .letter',
  		opacity: [0,1],
      easing: "easeInOutQuad",
      duration: 1000,
      delay: (el, i) => 100 * (i+1)
  	});
  }

  openLoginForm() {
  	this.dialog.open(LoginComponent, {width: '500px', height: '450px'});	
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
