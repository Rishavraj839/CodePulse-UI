import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import {  inject, Injectable, InputSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddBlogPostRequest, BlogPost, UpdateBlogPostRequest } from '../models/blogpost.model';
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

   getBlogPostById(id: InputSignal<string | undefined>): HttpResourceRef<BlogPost | undefined> {
    return httpResource<BlogPost>(() => `${this.apiBaseUrl}/api/blogposts/${id()}`);
  }

  editBlogPost(id: string, body: UpdateBlogPostRequest): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`, body, {
      withCredentials: true,
    });
  }

    deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`, {
      withCredentials: true,
    });
  }
}



