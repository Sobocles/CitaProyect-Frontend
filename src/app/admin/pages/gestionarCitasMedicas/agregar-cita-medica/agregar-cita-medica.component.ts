
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CitaMedicaService } from '../../services/cita-medica.service';
import { CitasResponse } from '../../interface/cita_medica';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../services/usuario.service';
import { MedicoService } from '../../services/medico.service';
import { TipoCitaService } from '../../services/tipo-cita.service';
import { MedicoResponse } from '../../interface/medicos';
import { UsuariosResponse } from '../../interface/paciente';
import { tipoCitaResponse } from '../../interface/tipoCita';

@Component({
  selector: 'app-agregar-cita-medica',
  templateUrl: './agregar-cita-medica.component.html',
  styleUrls: ['./agregar-cita-medica.component.scss']
})
export class AgregarCitaMedicaComponent implements OnInit {

  formulario!: FormGroup;
  public pacientes: any[] = [];
public medicos: any[] = [];
public tiposCita: any[] = [];


  constructor(private fb: FormBuilder, private citaMedicaService: CitaMedicaService, private router: Router, private PacienteService: PacienteService, private TipoCitaService: TipoCitaService, private MedicoService: MedicoService) { }

  ngOnInit(): void {
    this.formulario= this.fb.group({
      motivo: ['', [Validators.required]],
      rut_paciente: ['', [Validators.required]],
      rut_medico: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idTipoCita: ['', [Validators.required]],
    });
   this.cargaMedicos();
   this.cargaPacientes();
    this.cargaTipocita();
  }

  

  crearCita() {
    const formData = this.formulario.value;
    console.log(formData);

    this.citaMedicaService.crearCitaMedica(formData).subscribe(
      (respuesta:CitasResponse) => {
         // Navegar al Dashboard ya que el registro fue EXITOSO!!
         console.log(respuesta);
         Swal.fire('Mensaje', 'Cita creada exitosamente', 'success');

      this.router.navigateByUrl('/gestionar-cita');
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error'); //al incluir err.error.msg se Accede al mensaje de error incluido en el backenend en caso de que el correo ya este registrado
    } );
  }

  cargaMedicos() {
    this.MedicoService.cargarMedicos()
      .subscribe((response: MedicoResponse) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.medicos = response.medicos; // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'

      });
  }

  cargaTipocita() {
    this.TipoCitaService.cargaTipocita()
      .subscribe((response: tipoCitaResponse) => {
        console.log(response);
        this.tiposCita = response.tipo_cita; // Asigna el arreglo tipo_cita de la respuesta a tiposCitas

      });
  }

  cargaPacientes() {
    this.PacienteService.cargarPacientes()
      .subscribe((response: UsuariosResponse) => { // Asegúrate de que estás tipando la respuesta como 'any' o el tipo correcto
        this.pacientes = response.usuarios // Asigna la propiedad 'medicos' de la respuesta al arreglo 'medicos'
        console.log(this.pacientes);
      });
  }

}
