import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTiposCitasComponent } from './gestionar-tipos-citas.component';

describe('GestionarTiposCitasComponent', () => {
  let component: GestionarTiposCitasComponent;
  let fixture: ComponentFixture<GestionarTiposCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarTiposCitasComponent]
    });
    fixture = TestBed.createComponent(GestionarTiposCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
