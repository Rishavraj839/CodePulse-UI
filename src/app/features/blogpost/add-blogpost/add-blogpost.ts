import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPostService } from '../services/blog-post-service';
import { AddBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule,MarkdownComponent],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {

  blogPostService = inject(BlogPostService)
  categoryService = inject(CategoryService)
  router=inject(Router)

  private categoriesResourceRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesResourceRef.value;



  addBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(300)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),
    categories: new FormControl<string[]>([]),
  });

  onSubmit() {
    const formRawValue = this.addBlogPostForm.getRawValue();

    console.log(formRawValue);

    const requestDto: AddBlogPostRequest = {
      title: formRawValue.title,
      shortDescription: formRawValue.shortDescription,
      content: formRawValue.content,
      author: formRawValue.author,
      featuredImageUrl: formRawValue.featuredImageUrl,
      isVisible: formRawValue.isVisible,
      urlHandle: formRawValue.urlHandle,
      publishedDate: new Date(formRawValue.publishedDate),
      categories: formRawValue.categories ?? [],
    };

    this.blogPostService.createBlogPost(requestDto).subscribe({
      next: (response) => {
        console.log(response);

        // navigate to the blog post list page
        this.router.navigate(['/admin/blogposts']);
      },
      error: () => {
        console.error('Something went wrong!');
      },
    });
  }
}
