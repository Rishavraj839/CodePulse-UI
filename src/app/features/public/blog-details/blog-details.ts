import { Component, inject, input } from '@angular/core';
import { BlogPostService } from '../../blogpost/services/blog-post-service';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe,MarkdownComponent],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {

  url = input<string | undefined>();
  blogPostService = inject(BlogPostService);

  // Fetch the blog details using URL
  blogDetailsRef = this.blogPostService.getBlogPostByUrlHandle(this.url);
  isLoading = this.blogDetailsRef.isLoading;
  blogDetailsResponse = this.blogDetailsRef.value;
}