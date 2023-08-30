import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmarkFormatterComponent } from './checkmark-formatter.component';

describe('CheckmarkFormatterComponent', () => {
  let component: CheckmarkFormatterComponent;
  let fixture: ComponentFixture<CheckmarkFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckmarkFormatterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckmarkFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
