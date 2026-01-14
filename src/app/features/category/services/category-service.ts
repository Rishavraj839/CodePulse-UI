import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http =inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;
  

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  updateCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');


  addCategory(category:AddCategoryRequest){
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${this.apiBaseUrl}/api/Categories`,category,{
      withCredentials:true
    })
    .subscribe({
      next:()=>{
        this.addCategoryStatus.set('success');
      },
      error:()=>{
        this.addCategoryStatus.set('error');
      },
    }); 
  }

  getAllCategories(){
     return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/categories`);
  }

  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<Category>(() => `${this.apiBaseUrl}/api/categories/${id()}`);
  }

  updateCategory(id: string, updateCategoryRequestDto: UpdateCategoryRequest) {
    this.updateCategoryStatus.set('loading');

    this.http
      .put<void>(`${this.apiBaseUrl}/api/categories/${id}`, updateCategoryRequestDto, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.updateCategoryStatus.set('success');
        },
        error: () => {
          this.updateCategoryStatus.set('error');
        },
      });
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/api/categories/${id}`, {
      withCredentials: true,
    });
  }
} 
