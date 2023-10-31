import { Component } from '@angular/core';
import { TipoCitaService } from 'src/app/admin/pages/services/tipo-cita.service';
import { Tipo_cita, tipoCitaResponse } from 'src/app/admin/pages/interface/tipoCita';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusquedaMedicoService } from '../../services/busqueda-medico.service';
import { BusquedaMedicoComponent } from '../busqueda-medico/busqueda-medico.component';
import { Bloque, BloquesResponse } from '../interfaces/busqueda-medicos';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss']
})
export class FormularioCitaComponent {

  tiposCitas: Tipo_cita[] = [];
  form: FormGroup;
  private _bloques: Bloque[] = [];
  private bloquesSubject = new BehaviorSubject<Bloque[]>([]);
  bloques$ = this.bloquesSubject.asObservable();

  constructor(private fb: FormBuilder, private TipoCitaService: TipoCitaService, private BusquedaMedicoService: BusquedaMedicoService, private router: Router ) {
    this.form = this.fb.group({
      tipoCita: ['general', Validators.required],
      especialidad: [null],
      fecha: [null, Validators.required]
    });
  }

  get bloques(): Bloque[] { // Getter para acceder a los bloques
    return this._bloques;
  }


  ngOnInit(): void {
    this.TipoCitaService.cargaTipocita().subscribe(
      response => {
        this.tiposCitas = response.tipo_cita;
      },
      error => {
        console.error('Error cargando tipos de cita:', error);
      }
    );
  
  }

  enviarFormulario() {
    const formData = this.form.value;
    console.log(formData);
    this.BusquedaMedicoService.buscarHorarioDisponible(formData)
      .subscribe((resp: BloquesResponse) => {
        this.BusquedaMedicoService.actualizarBloques(resp.bloques);
        console.log(resp);
        this.router.navigate(['/busqueda-medico']);
      
      });
}
  

}
