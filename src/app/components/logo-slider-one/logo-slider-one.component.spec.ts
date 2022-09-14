import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSliderOneComponent } from './logo-slider-one.component';

describe('LogoSliderOneComponent', () => {
  let component: LogoSliderOneComponent;
  let fixture: ComponentFixture<LogoSliderOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoSliderOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoSliderOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
