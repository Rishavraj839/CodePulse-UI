import { TestBed } from '@angular/core/testing';

import { ImageSelectorService } from './image-selector-service';

describe('ImageSelectorService', () => {
  let service: ImageSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
