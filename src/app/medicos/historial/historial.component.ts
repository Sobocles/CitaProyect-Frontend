import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialService } from '../services/historial.service';
import { PacienteService } from 'src/app/admin/pages/services/usuario.service';
import { MedicoService } from 'src/app/admin/pages/services/medico.service';
import { UsuariosResponse } from '../usuarios';
import { MedicoResponse } from 'src/app/admin/pages/interface/medicos';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  historialMedicoForm: FormGroup;
    medicos: any[] = [];
    pacientes: any[] = [];

  constructor(private fb: FormBuilder, private HistorialService: HistorialService, private usuarioService: PacienteService, private medico: MedicoService, public AuthService: AuthService) { 
    this.historialMedicoForm = this.fb.group({
      id_historial_medico: ['', Validators.required],
      diagnostico: ['', Validators.required],
      medicamento: ['', Validators.required],
      notas: ['', Validators.required],
      fecha_consulta: ['', Validators.required],
      archivo: ['', Validators.required],
      rut_paciente: ['', Validators.required],
      rut_medico: [this.AuthService.medico.rut, Validators.required],
    });
  }
  ngOnInit(): void {
    const rut_medico = this.AuthService.medico.rut
    this.usuarioService.cargarAllPacientesEnCurso(rut_medico)
    .subscribe((pacientes: UsuariosResponse) => {
  
      this.pacientes = pacientes.usuarios;
     
    });
    
    this.medico.cargarMedicos()
      .subscribe( (medicos: MedicoResponse )=> {
      this.medicos = medicos.medicos;
    });
  }
  

  guardarHistorial() {
    this.HistorialService.crearHistorial(this.historialMedicoForm.value).subscribe(
      response => {
        console.log(response);
        // Muestra un mensaje de éxito con SweetAlert
        Swal.fire({
          title: '¡Éxito!',
          text: 'El historial médico ha sido guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error => {
        console.error(error);
        // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error.
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al guardar el historial médico.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  
}

