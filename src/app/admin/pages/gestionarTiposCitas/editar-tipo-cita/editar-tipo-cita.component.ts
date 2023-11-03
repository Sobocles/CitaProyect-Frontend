import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoCitaService } from '../../services/tipo-cita.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar-tipo-cita',
  templateUrl: './editar-tipo-cita.component.html',
  styleUrls: ['./editar-tipo-cita.component.scss']
})
export class EditarTipoCitaComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private TipoCitaService: TipoCitaService,  private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      tipo_cita: ['', Validators.required],
      precio: ['', Validators.required],
      especialidad_medica: ['', Validators.required],
      color_etiqueta: ['#3498db', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const tipoCitaId = params['id'];
        if (tipoCitaId) {
          // Obtén los datos del médico y llénalos en el formulario
          this.TipoCitaService.obtenerTipoCitaId(tipoCitaId).subscribe((response: any) => {
            const tipoCita= response.medico;
            this.formulario.patchValue({
              tipo_cita: tipoCita.tipo_cita,
              precio: tipoCita.precio,
              especialidad_medica: tipoCita.especialidad_medica,
              color_etiqueta: tipoCita.color_etiqueta
            });
          });
        }

    });
  }

}
