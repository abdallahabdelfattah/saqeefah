import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSectionFacilityComponent } from './about-section-facility.component';

describe('SearchFormComponent', () => {
  let component: AboutSectionFacilityComponent;
  let fixture: ComponentFixture<AboutSectionFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSectionFacilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSectionFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
