import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderBannerComponent } from './home-slider-banner.component';

describe('HomeSliderBannerComponent', () => {
  let component: HomeSliderBannerComponent;
  let fixture: ComponentFixture<HomeSliderBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSliderBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSliderBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
