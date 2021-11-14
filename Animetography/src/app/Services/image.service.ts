import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Gallery } from '../post/gallery';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public images: Gallery[] = [];
  private images$ = new Subject<Gallery[]>();

  constructor(private http: HttpClient) { }

  addImages(name: string, image: File): void {
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("image", image, name);
    this.http.post<{ gallery: Gallery }>('https://animetography-blog.com/api/gallery/archive', imageData)
      .subscribe((imageData) => {
        const gallery: Gallery = {
          _id: imageData.gallery._id,
          name: name,
          avatar: imageData.gallery.avatar,
        };
        this.images.push(gallery);
        this.images$.next(this.images);
        //console.log(this.images);
      });
  }

  getImage(id): Observable<any> {
    return this.http.get<any>('https://animetography-blog.com/api/gallery/archive/'+ id);
  }

  getImages() {
    this.http
      .get<{ images: Gallery[] }>('https://animetography-blog.com/api/gallery/archive')
      .pipe(
        map((imageData) => {
          return imageData.images;
        })
      )
      .subscribe((images) => {
        this.images = images;
        //console.log(images);
        this.images$.next(this.images);
      });
  }

  getImagesStream() {
    return this.images$.asObservable();
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
