import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVillasComponent } from './project-villas.component';

describe('ProjectVillasComponent', () => {
  let component: ProjectVillasComponent;
  let fixture: ComponentFixture<ProjectVillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectVillasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectVillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
