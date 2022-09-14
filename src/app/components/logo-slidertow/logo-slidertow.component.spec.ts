import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSlidertowComponent } from './logo-slidertow.component';

describe('LogoSlidertowComponent', () => {
  let component: LogoSlidertowComponent;
  let fixture: ComponentFixture<LogoSlidertowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoSlidertowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoSlidertowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
