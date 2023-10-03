import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarHorariosMedicosComponent } from './gestionar-horarios-medicos.component';

describe('GestionarHorariosMedicosComponent', () => {
  let component: GestionarHorariosMedicosComponent;
  let fixture: ComponentFixture<GestionarHorariosMedicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarHorariosMedicosComponent]
    });
    fixture = TestBed.createComponent(GestionarHorariosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
