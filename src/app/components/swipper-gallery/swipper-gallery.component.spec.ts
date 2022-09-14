import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipperGalleryComponent } from './swipper-gallery.component';

describe('SwipperGalleryComponent', () => {
  let component: SwipperGalleryComponent;
  let fixture: ComponentFixture<SwipperGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipperGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipperGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
