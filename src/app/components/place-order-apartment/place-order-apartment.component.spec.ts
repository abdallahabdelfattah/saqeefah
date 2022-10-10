import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderApartmentComponent } from './place-order-apartment.component';

describe('PlaceOrderApartmentComponent', () => {
  let component: PlaceOrderApartmentComponent;
  let fixture: ComponentFixture<PlaceOrderApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceOrderApartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOrderApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
