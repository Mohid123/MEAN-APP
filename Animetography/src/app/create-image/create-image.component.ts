import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Gallery } from "../post/gallery";
import { ImageService } from "../Services/image.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.scss']
})
export class CreateImageComponent implements OnInit {

  form: FormGroup;
  gallery: Gallery;
  imageData: string;

  constructor(private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
  	this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

   onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.imageService.addImages(this.form.value.name, this.form.value.image);
    this.router.navigate(['/archive']);
    this.form.reset();
    this.imageData = null;
  }

}
