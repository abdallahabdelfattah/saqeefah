import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRangeComponent } from './area-range.component';

describe('WebsiteInfoComponent', () => {
  let component: AreaRangeComponent;
  let fixture: ComponentFixture<AreaRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
