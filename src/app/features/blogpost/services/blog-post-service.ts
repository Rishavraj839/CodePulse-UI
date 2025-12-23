import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddBlogPostRequest, BlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  http = inject(HttpClient);
  apiBaseUrl= environment.apiBaseUrl

  createBlogPost(data: AddBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/blogposts`, data, {
      withCredentials: true,
    });
  }
  getAllBlogPosts(): HttpResourceRef<BlogPost[] | undefined> {
    return httpResource<BlogPost[]>(() => `${this.apiBaseUrl}/api/blogposts`);
  }



}
