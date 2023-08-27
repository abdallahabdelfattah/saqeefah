import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaAccordionItemComponent } from './villa-accordion-item.component';

describe('VillaAccordionItemComponent', () => {
  let component: VillaAccordionItemComponent;
  let fixture: ComponentFixture<VillaAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillaAccordionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
