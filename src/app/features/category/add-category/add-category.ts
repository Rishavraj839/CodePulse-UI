import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../services/category-service';
import { AddCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);


  constructor(){
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);

        // this.categoryService.addCategoryStatus.set('idle');
        // this.router.navigateByUrl('/admin/categories');
      }

      if (this.categoryService.addCategoryStatus() === 'error') {
        console.error('Add Category Request Failed');
      }
    });
  }
  

  private categoryService=inject(CategoryService)
  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('',{
      nonNullable:true,
    validators:[Validators.required,Validators.maxLength(200)]}),
  });

  get nameFormControl(){
    return this.addCategoryFormGroup.controls.name;

  }
  get urlHandleFormControl(){
    return this.addCategoryFormGroup.controls.urlHandle;

  }

  onSubmit(){
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto : AddCategoryRequest={
      name : addCategoryFormValue.name,
      urlHandle:addCategoryFormValue.urlHandle,
    };

    this.categoryService.addCategory(addCategoryRequestDto);

     
  }
}

