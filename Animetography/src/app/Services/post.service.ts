import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Post } from '../post/post';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

export interface post {
  success: boolean;
  post: any;
  token: any;
  posts: any;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  authToken: any;
  post: any;
  public posts: Post[] = [];
  private posts$ = new Subject<Post[]>();
  public baseUri: string = 'https://animetography-blog.com/api/blogs';
  public imageUri: string =
    'https://animetography-blog.com/api/gallery/archive/';
  public headers = new HttpHeaders().set('key', 'value');

  constructor(private http: HttpClient) {}

  getPosts(): Observable<post> {
    // this.loadToken();
    // const head = this.headers.append("Authorization", this.authToken);
    return this.http.get<post>(this.baseUri + '/allPosts'); //, { headers: head });
  }

  getPost(id): Observable<post> {
    // this.loadToken();
    // const head = this.headers.append("Authorization", this.authToken);
    return this.http.get<post>(this.baseUri + '/singlePost/' + id); //, { headers: head });
  }

  addPost(post): Observable<post> {
    this.loadToken();
    const head = this.headers.append('Authorization', this.authToken);
    return this.http.post<post>(this.baseUri + '/newPost', post, {
      headers: head,
    });
  }

  updatePost(id, post): Observable<post> {
    this.loadToken();
    const head = this.headers.append('Authorization', this.authToken);
    return this.http.put<post>(this.baseUri + '/editPost/' + id, post, {
      headers: head,
    });
  }

  deletePost(id): Observable<post> {
    this.loadToken();
    const head = this.headers.append('Authorization', this.authToken);
    return this.http.delete<post>(this.baseUri + '/deletePost/' + id, {
      headers: head,
    });
  }

  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
