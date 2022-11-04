import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordcursoComponent } from './dashbordcurso.component';

describe('DashbordcursoComponent', () => {
  let component: DashbordcursoComponent;
  let fixture: ComponentFixture<DashbordcursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordcursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
