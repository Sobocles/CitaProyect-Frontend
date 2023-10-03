import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCitasMedicasComponent } from './gestionar-citas-medicas.component';

describe('GestionarCitasMedicasComponent', () => {
  let component: GestionarCitasMedicasComponent;
  let fixture: ComponentFixture<GestionarCitasMedicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarCitasMedicasComponent]
    });
    fixture = TestBed.createComponent(GestionarCitasMedicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
