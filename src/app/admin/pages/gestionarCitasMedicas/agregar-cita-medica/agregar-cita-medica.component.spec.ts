import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCitaMedicaComponent } from './agregar-cita-medica.component';

describe('AgregarCitaMedicaComponent', () => {
  let component: AgregarCitaMedicaComponent;
  let fixture: ComponentFixture<AgregarCitaMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCitaMedicaComponent]
    });
    fixture = TestBed.createComponent(AgregarCitaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
