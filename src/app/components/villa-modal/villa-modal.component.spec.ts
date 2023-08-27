import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaModalComponent } from './villa-modal.component';

describe('VillaModalComponent', () => {
  let component: VillaModalComponent;
  let fixture: ComponentFixture<VillaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
