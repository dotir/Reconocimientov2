import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoscursoComponent } from './datoscurso.component';

describe('DatoscursoComponent', () => {
  let component: DatoscursoComponent;
  let fixture: ComponentFixture<DatoscursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoscursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatoscursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
