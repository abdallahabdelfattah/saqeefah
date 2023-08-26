import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaCardComponent } from './villa-card.component';

describe('VillaCardComponent', () => {
  let component: VillaCardComponent;
  let fixture: ComponentFixture<VillaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
