import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClientOrdersComponent } from './search-client-orders.component';

describe('SearchFormComponent', () => {
  let component: SearchClientOrdersComponent;
  let fixture: ComponentFixture<SearchClientOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchClientOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchClientOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
