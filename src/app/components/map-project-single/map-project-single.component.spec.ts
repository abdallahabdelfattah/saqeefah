import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapProjectSingleComponent } from './map-project-single.component';

describe('MapProjectSingleComponent', () => {
  let component: MapProjectSingleComponent;
  let fixture: ComponentFixture<MapProjectSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapProjectSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapProjectSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
