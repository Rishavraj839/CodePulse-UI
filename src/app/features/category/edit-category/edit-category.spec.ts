import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategory } from './edit-category';

describe('EditCategory', () => {
  let component: EditCategory;
  let fixture: ComponentFixture<EditCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
