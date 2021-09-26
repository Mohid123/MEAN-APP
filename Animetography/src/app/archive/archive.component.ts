import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ImageService } from '../Services/image.service';
import { Gallery } from "../post/gallery";
import { Subscription } from "rxjs";
import { expand } from '../animations/app.animation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, {
  Navigation,
  Scrollbar,
  Thumbs,
  Parallax
} from 'swiper';

SwiperCore.use([Navigation, Scrollbar, Parallax, Thumbs]);

declare var anime: any;

 @Component({
   selector: 'app-archive',
   templateUrl: './archive.component.html',
   styleUrls: ['./archive.component.scss'],
   host: {
    '[@expand]': 'true',
    'style': 'display: block;'
  },
  animations: [
  expand()
  ],
  encapsulation: ViewEncapsulation.None
 })
 export class ArchiveComponent implements OnInit, OnDestroy {

   public images: Gallery[] = [];
   private imageSubscription: Subscription;
   closeResult = '';
   thumbsSwiper: any;

   constructor(
     private spinner: NgxSpinnerService,
     private imageService: ImageService,
     private router: Router,
     private modalService: NgbModal,)
   {}


   ngOnInit(): void {

     this.spinner.show();
     this.imageService.getImages();
     this.imageSubscription = this.imageService
      .getImagesStream()
      .subscribe((images: Gallery[]) => {
        this.images = images;
        images.sort();
        images.reverse();
        //console.log(images);
        this.spinner.hide();
      });

      const textWrapper = document.querySelector('.ml2');
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime.timeline({loop: false})
      .add({
        targets: '.ml2 .letter',
        scale: [6,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutCirc",
        duration: 2000,
        delay: (el, i) => 150*i
      // }).add({
      //   targets: '.ml2',
      //   opacity: 0,
      //   duration: 1000,
      //   easing: "easeOutExpo",
      //   delay: 1000
       });

      // const textWrapper1 = document.querySelector('.ml3');
      // textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      // anime.timeline({loop: false})
      // .add({
      //   targets: '.ml3 .letter',
      //   scale: [6,1],
      //   opacity: [0,1],
      //   translateZ: 0,
      //   easing: "easeInCirc",
      //   duration: 650,
      //   delay: (el, i) => 60*i
      //  });
   }

    ngOnDestroy() {
    this.imageSubscription.unsubscribe();
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
