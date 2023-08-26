import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSingleComponent } from './map-single.component';

describe('MapSingleComponent', () => {
  let component: MapSingleComponent;
  let fixture: ComponentFixture<MapSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
