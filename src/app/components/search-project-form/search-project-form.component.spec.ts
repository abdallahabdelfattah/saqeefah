import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProjectFormComponent } from './search-project-form.component';

describe('SearchFormComponent', () => {
  let component: SearchProjectFormComponent;
  let fixture: ComponentFixture<SearchProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProjectFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
